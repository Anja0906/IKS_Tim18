import { Component } from '@angular/core';
import {environment} from "../../../environments/environment";
import {FormGroup} from "@angular/forms";
import {PanicSocket} from "../../model/Panic";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { Howl } from 'howler';

@Component({
  selector: 'app-panic-notifications',
  templateUrl: './panic-notifications.component.html',
  styleUrls: ['./panic-notifications.component.css']
})
export class PanicNotificationsComponent {

  private serverUrl = environment.apiHost + 'socket'
  private stompClient: any;
  form!: FormGroup;
  userForm!: FormGroup;
  panic!: PanicSocket;

  isLoaded: boolean = false;
  isCustomSocketOpened = false;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openGlobalSocket()
    });

  }

  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/newPanic", (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }


  handleResult(message: { body: string; }) {
    if (message.body) {
      this.panic = JSON.parse(message.body);
      this.openNotification(this.panic.reason, "Close")
    }
  }

  openNotification(message: string, action: string) {
    let mess = "New panic! Reason: " + message;
    this.playSound();
    this._snackBar.open(mess, action);
  }

  playSound() {
    const sound = new Howl({
      src: ['assets/panicNotification.wav']
    });
    sound.play();
  }
}

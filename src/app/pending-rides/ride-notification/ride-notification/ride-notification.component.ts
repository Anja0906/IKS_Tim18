import { Component } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {Howl} from "howler";
import {Ride} from "../../../model/Ride";
import {StorageService} from "../../../service/storage/storage.service";

@Component({
  selector: 'app-ride-notification',
  templateUrl: './ride-notification.component.html',
  styleUrls: ['./ride-notification.component.css']
})
export class RideNotificationComponent {
  private serverUrl = environment.apiHost + 'socket'
  private stompClient: any;
  ride!: Ride;
  isLoaded: boolean = false;

  constructor(private _snackBar: MatSnackBar, private storageService:StorageService) { }

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
      this.stompClient.subscribe(`/socket-topic/driver/${this.storageService.getUser().id}`, (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message: { body: string; }) {
    if (message.body) {
      console.log(message.body);
      this.ride = JSON.parse(message.body);
      this.openNotification(this.ride, "Close")
    }
  }

  openNotification(ride: Ride, action: string) {
    let mess = "New ride! ID: " + ride.id +"\n"+
      "Start time: " + ride.startTime +"\n"+
      "End time: " + ride.endTime +"\n"+
      "Departure: " + ride.locations[0].departure +"\n"+
      "Destination: " + ride.locations[0].destination +"\n";
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

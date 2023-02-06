import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { environment } from 'src/environments/environment';
import {MatSnackBar} from "@angular/material/snack-bar";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {Howl} from "howler";
import { Ride } from 'src/app/model/Ride';
import { StorageService } from 'src/app/service/storage/storage.service';

@Component({
  selector: 'app-ride-notification',
  templateUrl: './ride-notification.component.html',
  styleUrls: ['./ride-notification.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RideNotificationComponent implements OnInit{

  private serverUrl = environment.apiHost + 'socket'
  private stompClient: any;
  isLoaded: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public ride: Ride, public matDialogRef: MatDialogRef<RideNotificationComponent>,
  private _snackBar: MatSnackBar, private storageService:StorageService) {
  }


  ngOnInit(): void {
  }


  onAccept() : void{
    this.matDialogRef.close(true);
  }

  onReject() : void{
    this.matDialogRef.close(false);
  }


  onCloseDialog() {
    this.matDialogRef.close();
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
    let user = this.storageService.getUser();
    let userId = user.id;
    let roles = user.roles;
    if (this.isLoaded) {
      if (roles.includes("ROLE_DRIVER")) {
        console.log("hej");
        this.stompClient.subscribe(`/socket-topic/driver-new-ride/${userId}`, (message: { body: string; }) => {
          this.handleResult(message);
        });
        this.stompClient.subscribe(`/socket-topic/withdraw/${userId}`, (message: { body: string; }) => {
          this.handleResult(message);
        });
        this.stompClient.subscribe(`/socket-topic/started/${userId}`, (message: { body: string; }) => {
          this.handleResult(message);
        });
      }
      if (roles.includes("ROLE_PASSENGER")) {
        
        this.stompClient.subscribe(`/socket-topic/passenger-new-ride/${userId}`, (message: { body: string; }) => {
          this.handleResult(message);
        });
        this.stompClient.subscribe(`/socket-topic/accepted/${userId}`, (message: { body: string; }) => {
          this.handleResult(message);
        });
        this.stompClient.subscribe(`/socket-topic/cancelled/${userId}`, (message: { body: string; }) => {
          this.handleResult(message);
        });
      }
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
    let mess
    if (ride.status=="CANCELLED") {
      mess = "Ride starting at " + ride.startTime + " has been withdrawn";
    }else if (ride.status=="STARTED") {
      mess = "Ride starting at " + ride.startTime + " has started";
    } else if (ride.status=="ACCEPTED") {
      mess = "Ride starting at " + ride.startTime + " has been accepted";
    } else if (ride.status=="REJECTED") {
      mess = "Ride starting at " + ride.startTime + " has been rejected";
    } else {
      mess = "New ride! ID: " + ride.id +"\n"+
        "Start time: " + ride.startTime +"\n"+
        "End time: " + ride.endTime +"\n"+
        "Departure: " + ride.locations[0].departure +"\n"+
        "Destination: " + ride.locations[0].destination +"\n";
    }
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

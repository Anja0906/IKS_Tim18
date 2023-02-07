import { Component } from '@angular/core';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {Howl} from "howler";
import {environment} from "../../environments/environment";
import {FormGroup} from "@angular/forms";
import {Ride} from "../model/Ride";
import {MatDialog} from "@angular/material/dialog";
import {
  RideNotificationComponent
} from "../pending-rides/ride-notification/ride-notification/ride-notification.component";
import {StorageService} from "../service/storage/storage.service";
import {RideService} from "../service/ride/ride.service";
import {RejectionComponent} from "../about-ride/reject/rejection/rejection.component";
import {Reason} from "../model/Reason";

@Component({
  selector: 'app-driver-page',
  templateUrl: './driver-page.component.html',
  styleUrls: ['./driver-page.component.css']
})
export class DriverPageComponent {
  private serverUrl = environment.apiHost + 'socket'
  private stompClient: Stomp.Client;
  form!: FormGroup;
  ride!: Ride;
  reason:Reason = {reason:""};

  isLoaded: boolean = false;
  constructor(private dialog: MatDialog, private storageService: StorageService,private rideService:RideService) {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
  }

  ngOnInit() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {


    let that = this;
    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openGlobalSocket()
    });

  }

  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/socket-topic/driver-new-ride/" + this.storageService.getUser().id, (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }


  handleResult(message: { body: string; }) {
    if (message.body) {
      this.ride = JSON.parse(message.body);
      this.playSound();
      this.openDialog(this.ride)
    }
  }

  openDialog(obj: Ride) {
    let dialogRef = this.dialog.open(RideNotificationComponent, {
      data: obj,
      panelClass: 'my-dialog-container-class'
    });



    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result);
        if(result===true){
          this.rideService.acceptRide(this.ride.id).subscribe(() => {
          });
        }else{
          this.openRejection(this.ride);
        }
      }
    );
  }

  openRejection(obj: Ride) {
    let dialogRef = this.dialog.open(RejectionComponent, {
      data: obj,
      panelClass: 'my-dialog-container-class'
    });
    dialogRef.afterClosed().subscribe(
      result => {
        this.reason.reason=result;
        this.rideService.rejectRide(this.ride.id,this.reason).subscribe(() => {
        });
      }
    );
  }


  playSound() {
    const sound = new Howl({
      src: ['assets/panicNotification.wav']
    });
    sound.play();
  }

}

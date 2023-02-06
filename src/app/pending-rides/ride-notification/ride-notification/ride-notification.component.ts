import {Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Ride} from "../../../model/Ride";

@Component({
  selector: 'app-ride-notification',
  templateUrl: './ride-notification.component.html',
  styleUrls: ['./ride-notification.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RideNotificationComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public ride: Ride, public matDialogRef: MatDialogRef<RideNotificationComponent>) {
  }

  ngOnInit(): void {
  }


  onAccept() : void{
    this.matDialogRef.close(true);

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

  onReject() : void{
    this.matDialogRef.close(false);
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

  onCloseDialog() {
    this.matDialogRef.close();
  }
}

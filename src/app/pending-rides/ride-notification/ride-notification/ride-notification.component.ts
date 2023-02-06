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
  }

  onReject() : void{
    this.matDialogRef.close(false);
  }


  onCloseDialog() {
    this.matDialogRef.close();
  }
}

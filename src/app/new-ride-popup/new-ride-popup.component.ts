import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-ride-popup',
  templateUrl: './new-ride-popup.component.html',
  styleUrls: ['./new-ride-popup.component.css']
})
export class NewRidePopupComponent implements OnInit, OnDestroy{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public matDialogRef: MatDialogRef<NewRidePopupComponent>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.matDialogRef.close(this.data);
  }


  onCloseDialog() {
    this.matDialogRef.close();
  }
}

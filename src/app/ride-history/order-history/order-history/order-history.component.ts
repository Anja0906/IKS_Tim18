import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { RideRec } from 'src/app/order-ride/order-ride.component';
import {FormBuilder, Validators, FormControl, FormGroup, FormArray} from '@angular/forms';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  currentDate = new Date().toISOString().slice(0, -8);
  getData: boolean=false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private  _formBuilder: FormBuilder, public matDialogRef: MatDialogRef<OrderHistoryComponent>) {
  }

  firstFormGroup = this._formBuilder.group({
    date: this.currentDate
  });

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.getData) {
      this.matDialogRef.close(this.data);
    } else {
      this.matDialogRef.close();
    }
    this.getData = false;
  }

  onCloseAfter() {
    this.getData=true;
    this.data.date = this.firstFormGroup.value.date;
    this.matDialogRef.close(this.data);
  }

  onCloseNow() {
    this.getData=true;
    this.matDialogRef.close();
  }
}

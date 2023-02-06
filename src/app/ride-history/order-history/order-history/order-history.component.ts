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

  //@ViewChild('date') date!: ElementRef;
  currentDate = new Date().toISOString().slice(0, -8);


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private  _formBuilder: FormBuilder, public matDialogRef: MatDialogRef<OrderHistoryComponent>) {
  }

  firstFormGroup = this._formBuilder.group({
    date: this.currentDate
  });

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.matDialogRef.close(this.data);
  }

  onCloseDialog() {
    this.data.scheduledTime = this.firstFormGroup.value.date;
    //console.log(this.firstFormGroup.value.date);
    this.matDialogRef.close(this.data);
  }

  onCloseNow() {
    this.matDialogRef.close();
  }

  onConfirm() {
    //this.data.scheduledTime = this.date.nativeElement;
    this.matDialogRef.close(this.data);
    this.ngOnDestroy();
  }
}

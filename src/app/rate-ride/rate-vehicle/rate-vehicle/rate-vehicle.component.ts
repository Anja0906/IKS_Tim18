import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Review} from "../../../model/Review";

@Component({
  selector: 'app-rate-vehicle',
  templateUrl: './rate-vehicle.component.html',
  styleUrls: ['./rate-vehicle.component.css']
})
export class RateVehicleComponent {
  rateDriver: number = 1;
  rateVehicle: number = 1;

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  @ViewChild('vehicleComment') vehicleInput!: ElementRef;


  constructor(@Inject(MAT_DIALOG_DATA) public data: Review, public matDialogRef: MatDialogRef<RateVehicleComponent>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.matDialogRef.close(this.data);
  }

  onCloseDialog() {
    this.ngOnDestroy();
  }

  updateSettingVehicle(event: any) {
    this.rateVehicle = event.target.ariaValueText;
    console.log(this.rateVehicle);
  }

  onConfirmVehicle() {
    const textarea = this.vehicleInput.nativeElement;
    const rate = this.rateVehicle;
    this.data.comment = textarea.value;
    this.data.rating = rate;
    this.ngOnDestroy();
  }
}

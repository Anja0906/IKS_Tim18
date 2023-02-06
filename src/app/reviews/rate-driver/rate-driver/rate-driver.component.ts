import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ReviewSmall} from "../../../model/Review";

@Component({
  selector: 'app-rate-driver',
  templateUrl: './rate-driver.component.html',
  styleUrls: ['./rate-driver.component.css']
})
export class RateDriverComponent {
  rateDriver: number = 1;
  rateVehicle: number = 1;

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  @ViewChild('driverComment') driverInput!: ElementRef;


  constructor(@Inject(MAT_DIALOG_DATA) public data: ReviewSmall, public matDialogRef: MatDialogRef<RateDriverComponent>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.matDialogRef.close(this.data);
  }

  onCloseDialog() {
    this.matDialogRef.close();
  }

  updateSettingDriver(event: any) {
    this.rateDriver = event.target.ariaValueText;
    console.log(this.rateDriver);
  }

  onConfirmDriver() {
    const textarea = this.driverInput.nativeElement;
    const rate = this.rateDriver;
    this.data.comment = textarea.value;
    this.data.rating = rate;
    this.ngOnDestroy();
  }
}

import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Ride} from "../../../model/Ride";


@Component({
  selector: 'app-panic-drive',
  templateUrl: './panic-drive.component.html',
  styleUrls: ['./panic-drive.component.css']
})
export class PanicDriveComponent implements OnInit, OnDestroy{
  @ViewChild('panic') panicInput!: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public matDialogRef: MatDialogRef<PanicDriveComponent>) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.matDialogRef.close(this.data);
  }

  onCloseDialog() {
    const textarea = this.panicInput.nativeElement;
    this.data = textarea.value;
    this.matDialogRef.close(this.data);
  }
}

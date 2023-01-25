import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Ride} from "../model/Ride";
import {RideService} from "../service/ride/ride.service";
import {NoteComponent} from "../blocked-users/note/note.component";
import {RejectionComponent} from "./reject/rejection/rejection.component";
import {MatDialog} from "@angular/material/dialog";
import {PanicDriveComponent} from "./panic/panic-drive/panic-drive.component";
import {Reason} from "../model/Reason";
import {StorageService} from "../service/storage/storage.service";

export interface IRideFormGroup extends FormGroup {
  value: Ride;
  controls: {
    id: FormControl;
    estimatedTimeInMinutes: FormControl;
    startTime: FormControl;
    endTime: FormControl;
    totalCost: FormControl;
    babyTransport: FormControl;
    petTransport: FormControl;
    splitFare: FormControl;
    status: FormControl;
    name: FormControl;
    surname: FormControl;
  };
}
@Component({
  selector: 'app-about-ride',
  templateUrl: './about-ride.component.html',
  styleUrls: ['./about-ride.component.css']
})
export class AboutRideComponent implements OnInit{
  ride!: Ride;
  form!: IRideFormGroup
  result: any;
  reason!: Reason ;

  constructor(private formBuilder: FormBuilder, private rideService: RideService, private router: Router,
              private dialog: MatDialog, private storageService:StorageService ) { }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        id: [Number("0")],
        estimatedTimeInMinutes: [Number("0")],
        startTime: [''],
        endTime: [''],
        totalCost: [Number("0")],
        babyTransport: [false],
        petTransport: [false],
        splitFare: [false],
        status: [''],
      }) as IRideFormGroup;
      this.rideService.getActiveRide(this.storageService.getUser().id).subscribe((res) => {
        this.ride = res;
        this.form.patchValue(res);
      });
      this.form.patchValue(this.ride);
  }

  openDialogRejection(id: number) {
    const dialogRef = this.dialog.open(RejectionComponent, {
      data: this.reason,
      panelClass: 'my-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.reason = result;
      this.rideService.rejectRide(this.ride.id,this.reason);
    });

  }

  openDialogPanic(id: number) {
    const dialogRef = this.dialog.open(PanicDriveComponent, {
      data: this.reason,
      panelClass: 'my-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.reason = result;
      console.log(this.reason);
      this.rideService.activatePanic(this.ride.id,this.reason)
    });
  }
}


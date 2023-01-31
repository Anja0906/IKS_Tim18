import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Ride} from "../model/Ride";
import {RideService} from "../service/ride/ride.service";
import {NoteComponent} from "../blocked-users/note/note.component";
import {RejectionComponent} from "./reject/rejection/rejection.component";
import {MatDialog} from "@angular/material/dialog";
import {PanicDriveComponent} from "./panic/panic-drive/panic-drive.component";
import {Reason} from "../model/Reason";
import {StorageService} from "../service/storage/storage.service";
import differenceInSeconds from 'date-fns/differenceInSeconds'
import {co} from "chart.js/dist/chunks/helpers.core";
import { createReason } from 'src/app/model/Reason';
import {DriverService} from "../service/driver/driver.service";

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
  now = new Date();
  isPassenger: boolean = false;
  rideFinished: boolean = true;


  constructor(private formBuilder: FormBuilder, private rideService: RideService, private router: Router,
              private dialog: MatDialog, private storageService:StorageService,private driverService:DriverService ) { }

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
      if (this.storageService.getUser().roles.includes("ROLE_DRIVER")){
        this.rideService.getActiveRide(this.storageService.getUser().id).subscribe((res) => {
          this.ride = res;
          this.form.patchValue(res);
          this.isPassenger = false;
        });
      } else {
        this.rideService.getActiveRideForPassenger(this.storageService.getUser().id).subscribe((res) => {
          this.ride = res;
          this.isPassenger = true;

          console.log(this.ride);
        let strStartTime = this.ride.startTime;
        let startTime = new Date();
        let diff = -1;

        const [dateValues, timeValues] = strStartTime.split(' ');
        console.log(dateValues); 
        console.log(timeValues); 

        const [year, month, day] = dateValues.split('-');
        const [important, _] = timeValues.split('.');

        const [hours, minutes, seconds] = important.split(':');

        startTime = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
        console.log(startTime);
        console.log(this.now);
        diff = differenceInSeconds(startTime, this.now);

        if (diff > 0) {
          this.router.navigate(['passenger/timer/' + this.ride.id]);
        } else {
          this.rideService.getRide(this.ride.id).subscribe((res) => {
              if (res.status == "ACCEPTED") {
                this.rideService.startRide(this.ride.id).subscribe((res) => {
                  this.ride = res;
                  console.log(this.ride);
                });
              }
          });
          this.form.patchValue(res);
        }
        });
      }
      this.driverService.driverCheck(this.storageService.getUser().id).subscribe((valid) => {
        if(valid === -1){
          confirm("You worked more than 8 hours");
          this.router.navigate(['']);
          this.storageService.clean();
        }
      });
      this.rideService.getActiveRide(this.storageService.getUser().id).subscribe((res) => {
        this.ride = res;
        this.form.patchValue(res);
      });
      this.form.patchValue(this.ride);
  }

  openDialogRejection() {
    const dialogRef = this.dialog.open(RejectionComponent, {
      data: this.reason,
      panelClass: 'my-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.reason = createReason(result);
      this.rideService.rejectRide(this.ride.id,this.reason).subscribe( {
      });
      this.router.navigate(['driver']);
    });
  }


  openDialogPanic() {
    const dialogRef = this.dialog.open(PanicDriveComponent, {
      data: this.reason,
      panelClass: 'my-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.reason = createReason(result);
      this.rideService.activatePanic(this.ride.id,this.reason).subscribe( {
      });
    });
  }


  rateRide() {
    this.router.navigate(['passenger']);
  }

}


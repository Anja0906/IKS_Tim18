import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Ride} from "../model/Ride";
import {RideService} from "../service/ride/ride.service";
import {NoteComponent} from "../blocked-users/note/note.component";
import {MatDialog} from "@angular/material/dialog";
import {PanicDriveComponent} from "./panic/panic-drive/panic-drive.component";
import { createReason, Reason } from 'src/app/model/Reason';
import {StorageService} from "../service/storage/storage.service";
import differenceInSeconds from 'date-fns/differenceInSeconds'
import {co} from "chart.js/dist/chunks/helpers.core";
import {DriverService} from "../service/driver/driver.service";
import { createReview, ReviewSmall } from '../model/Review';
import { ReviewService } from '../service/review/review.service';
import { RateDriverComponent } from '../reviews/rate-driver/rate-driver/rate-driver.component';
import { RateVehicleComponent } from '../reviews/rate-vehicle/rate-vehicle/rate-vehicle.component';
import { environment } from 'src/environments/environment';
import {MatSnackBar} from "@angular/material/snack-bar";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {Howl} from "howler";
import {Review} from "../reviews/reviews/reviews.component";

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
  rideFinished: boolean = false;
  review!: ReviewSmall;
  private serverUrl = environment.apiHost + 'socket'
  private stompClient: any;
  isLoaded: boolean = false;



  constructor(private formBuilder: FormBuilder, private rideService: RideService, private router: Router,
              private dialog: MatDialog, private storageService:StorageService,private driverService:DriverService,
              private reviewService: ReviewService, private _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.initializeWebSocketConnection();
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

        let strStartTime = this.ride.startTime;
        let startTime = new Date();
        let diff = -1;

        const [dateValues, timeValues] = strStartTime.split(' ');

        const [year, month, day] = dateValues.split('-');
        const [important, _] = timeValues.split('.');

        const [hours, minutes, seconds] = important.split(':');

        startTime = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
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


  endRide(){
    this.rideService.endRide(this.ride.id).subscribe((res) => {
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


  rating!: number;
  comment!: string;
  rateDriver() {
    let obj: ReviewSmall;
    const dialogRef = this.dialog.open(RateDriverComponent, {
      data: {rating: this.rating, comment: this.comment},
      panelClass: 'my-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!Number.isNaN(result.rating) && result.comment != undefined ) {

        obj = {
          "rating": parseInt(result.rating),
          "comment": result.comment
        }
        this.review = createReview(result.rating, result.comment);
        const rep = this.reviewService.addDriverReview(this.ride.id, this.review)
        .subscribe(data => {
      }, error => {
      }
      );
      }
    });
  }

  rateVehicle() {
    let obj: ReviewSmall;
    const dialogRef = this.dialog.open(RateVehicleComponent, {
      data: {rating: this.rating, comment: this.comment},
      panelClass: 'my-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!Number.isNaN(result.rating) && result.comment != undefined ) {
        obj = {
          "rating": parseInt(result.rating),
          "comment": result.comment
        }
        this.review = createReview(result.rating, result.comment);
        const rep = this.reviewService.addVehicleReview(this.ride.id, this.review)
        .subscribe(data => {
          console.log(data);
      }, error => {
        console.log(error);
      }
      );
        console.log(rep);
    }
    });
  }

  pay() {
    alert("Ride paid!");
  }

  end() {
    this.rideFinished = true;
    alert("Ride ended");
    this.rideService.endRide(this.ride.id).subscribe((res) => {
      this.ride = res;
      console.log(this.ride);
    });
    this.router.navigate(['driver']);
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

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
      if (roles.includes("ROLE_PASSENGER")) {
        this.stompClient.subscribe(`/socket-topic/ended/${userId}`, (message: { body: string; }) => {
          this.handleResult(message);
        });
      }
    }
  }

  handleResult(message: { body: string; }) {
    if (message.body) {
      console.log(message.body);
      this.ride = JSON.parse(message.body);
      this.openNotification(this.ride, "Close")
    }
  }

  openNotification(ride: Ride, action: string) {
    let mess = "Ride starting at " + ride.startTime + " has been ended";
    this.playSound();
    this._snackBar.open(mess, action);
    this.rideFinished = true;
  }

  playSound() {
    const sound = new Howl({
      src: ['assets/panicNotification.wav']
    });
    sound.play();
  }

}


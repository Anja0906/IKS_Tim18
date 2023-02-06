import { Component, Input,  OnInit } from '@angular/core';
import { map, timer, takeWhile, finalize } from 'rxjs';
import millisecondsToSeconds from 'date-fns/millisecondsToSeconds'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import {ActivatedRoute, Router} from "@angular/router";
import {Ride} from "../model/Ride";
import {RideService} from "../service/ride/ride.service";
import {StorageService} from "../service/storage/storage.service";
import { Moment } from 'moment';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Howl} from "howler";

@Component({
  selector: 'app-current-ride-timer',
  templateUrl: './current-ride-timer.component.html',
  styleUrls: ['./current-ride-timer.component.css']
})
export class CurrentRideTimerComponent {
  id!:any;
  ride!: Ride;
  now = new Date();
  differenceSec = 5;
  seconds = 0;
  untilRide=0;
  diff1!: number;
  timeRemaining!: any;
  smallTime = false;
  bigTime = true;
  isStartBtnDisabled: boolean= true;
  isWithdrawBtnDisabled: boolean = false;
  

  constructor(private route: ActivatedRoute, private rideService: RideService, private storageService: StorageService, private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    let startTime = new Date();
    let diff = 0;
    let diff2;
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.rideService.getRide(this.id).subscribe((res) => {
        this.ride = res;
        console.log(this.ride);
        let strStartTime = this.ride.startTime;

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
        console.log(diff);
        this.diff1 = diff;
        this.seconds = this.calculate();
        this.untilRide = this.seconds;
        if (this.seconds > 3600) {
          this.smallTime = false;
          this.bigTime = true;
        } else {
          this.smallTime = true;
          this.bigTime = false;
        }
        this.timer();
        //this.anotherTimer();
      });
    });
  }

  
  timer() {
    console.log('hej');
  this.timeRemaining = timer(0, 1000).pipe(
    map(n => this.seconds <= 3600 ? 
      (this.seconds - n) * 1000 
      : 
      (this.seconds - n - 3600) * 1000),
    takeWhile(n => n >= 0), 
    finalize(() => {
      this.isStartBtnDisabled = false;
      this.isWithdrawBtnDisabled = true;
    })
  );
  }

  anotherTimer() {
    timer(0, 5000).subscribe(() => { 
      this.openNotification("Close");
      this.untilRide-=5;
    });
  }

  openNotification(action: string) {
    let mess = "Ride starts in " + this.untilRide;
    this.playSound();
    this._snackBar.open(mess, action);
  }

  playSound() {
    const sound = new Howl({
      src: ['assets/panicNotification.wav']
    });
    sound.play();
  }

  calculate() {
    console.log(this.diff1);
    return this.diff1;
  }

  start() {
    // dodaj start endpoint
    this.rideService.startRide(this.id).subscribe((res) => {
      this.ride = res;
      console.log(this.ride);
    });
    this.router.navigate(['passenger/about-ride']);
  }

  withdraw() {
    console.log('hi withdraw');
    // dodaj withdraw endpoint
    this.rideService.withdrawRide(this.id).subscribe((res) => {
      this.ride = res;
      console.log(this.ride);
    });
    this.router.navigate(['passenger']);
    alert("Ride has been withdrawn")
  }
}

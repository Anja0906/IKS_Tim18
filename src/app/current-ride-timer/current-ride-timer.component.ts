/*
import { Component } from '@angular/core';
import {timer} from 'rxjs';
import {takeWhile, tap} from 'rxjs/operators';

@Component({
  selector: 'app-current-ride-timer',
  templateUrl: './current-ride-timer.component.html',
  styleUrls: ['./current-ride-timer.component.css']
})
export class CurrentRideTimerComponent {
counter = 10;
constructor(){
 
    
    timer(1000, 1000) //Initial delay 1 seconds and interval countdown also 1 second
      .pipe(
        takeWhile( () => this.counter > 0 ),
        tap(() => this.counter--)
      )
      .subscribe( () => {
        //add you more code
      } );
}
}
*/
import { Component, Input,  OnInit } from '@angular/core';
import { map, timer, takeWhile } from 'rxjs';
import millisecondsToSeconds from 'date-fns/millisecondsToSeconds'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import {ActivatedRoute, Router} from "@angular/router";
import {Ride} from "../model/Ride";
import {RideService} from "../service/ride/ride.service";
import {StorageService} from "../service/storage/storage.service";
import { Moment } from 'moment';

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
  diff1!: number;
  timeRemaining!: any;
  smallTime = false;
  bigTime = true;
  

  constructor(private route: ActivatedRoute, private rideService: RideService, private storageService: StorageService) {}

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
        if (this.seconds > 3600) {
          this.smallTime = false;
          this.bigTime = true;
        } else {
          this.smallTime = true;
          this.bigTime = false;
        }
        this.timer();
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
  );
  
  }

  calculate() {
    console.log(this.diff1);
    return this.diff1;
  }
}

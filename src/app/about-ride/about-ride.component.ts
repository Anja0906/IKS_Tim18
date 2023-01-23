import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Ride} from "../model/Ride";
import {RideService} from "../service/ride/ride.service";

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

  constructor(private formBuilder: FormBuilder, private rideService: RideService, private router: Router) { }

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
      this.rideService.getRide(1).subscribe((res) => {
        this.ride = res;
        this.form.patchValue(res);
      });
      this.form.patchValue(this.ride);
  }
}


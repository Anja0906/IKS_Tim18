import {Component, OnInit} from '@angular/core';
import {Ride} from "../model/Ride";
import {FormControl, FormGroup} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {RideService} from "../service/ride/ride.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent implements OnInit{
  rides: Ride[] = [];
  totalElements: number = 0;

  createRidesForm = new FormGroup({
    id: new FormControl(),
    startTime: new FormControl(),
    endTime: new FormControl(),
    totalCost: new FormControl(),
    estimatedTimeInMinutes: new FormControl(),
  });

  constructor(private rideService: RideService, private router: Router) {}
  ngOnInit(): void {
    this.getRidesForDriver()
  }

  private getRidesForDriver() {
    this.rideService.getRidesForDriver(1)
      .subscribe(data => {
          // @ts-ignore
          this.rides = data['results'];
          // @ts-ignore
          this.totalElements = data['totalCount'];
        }, error =>
        {
          console.log(error.error.message);
        }
      );
  }

  nextPage(event: PageEvent) {
    const request = {};
    // @ts-ignore
    request['page'] = event.pageIndex.toString();
    // @ts-ignore
    request['size'] = event.pageSize.toString();
    this.getRidesForDriver();
  }
}

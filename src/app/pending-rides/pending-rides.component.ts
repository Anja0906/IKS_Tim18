import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Ride} from "../model/Ride";
import {RideService} from "../service/ride/ride.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-pending-rides',
  templateUrl: './pending-rides.component.html',
  styleUrls: ['./pending-rides.component.css']
})
export class PendingRidesComponent implements OnInit{
  pendingRides: Ride[] = [];
  totalElements: number = 0;

  createPendingRidesForm = new FormGroup({
    id: new FormControl(),
    startTime: new FormControl(),
    totalCost: new FormControl(),
    estimatedTimeInMinutes: new FormControl(),
  });
  constructor(private rideService: RideService, private router: Router) {}

  ngOnInit(): void {
    this.getPendingRides({ page: "0", size: "10" })
  }

  private getPendingRides(request: { page?: string; size?: string; }) {
    this.rideService.getPendingRides()
      .subscribe(data => {
          // @ts-ignore
          this.pendingRides = data['results'];
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
    this.getPendingRides(request);
  }

}

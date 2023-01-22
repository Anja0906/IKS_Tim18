import {Component, OnInit} from '@angular/core';
import {Ride} from "../model/Ride";
import {FormControl, FormGroup} from "@angular/forms";
import {PageEvent} from "@angular/material/paginator";
import {RideService} from "../service/ride/ride.service";
import {Router} from "@angular/router";
import {StorageService} from "../service/storage/storage.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent implements OnInit{
  displayedColumns: string[] = ['id', 'startTime', 'endTime', 'totalCost', 'estimatedTime'];
  dataSource!: MatTableDataSource<Ride>;
  rides: Ride[] = [];
  totalElements: number = 0;





  constructor(private rideService: RideService, private router: Router, private storageService:StorageService) {}
  ngOnInit(): void {
    this.rideService.getRidesForDriver(this.storageService.getUser().id)
      .subscribe(data => {
          this.rides = data['results'];
          this.dataSource = new MatTableDataSource<Ride>(this.rides);
          this.totalElements = data['totalCount'];
        }, error =>
        {
          console.log(error.error.message);
        }
      );
  }


}
export interface RideHistoryComponent {
  id: number;
  startTime: string;
  endTime: string;
  totalCost: number;
  estimatedTimeInMinutes: number;
}

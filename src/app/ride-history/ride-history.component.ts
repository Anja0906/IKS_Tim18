import {Component, OnInit, ViewChild} from '@angular/core';
import {Ride} from "../model/Ride";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {RideService} from "../service/ride/ride.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../service/storage/storage.service";
import {MatTableDataSource} from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import {DriverService} from "../service/driver/driver.service";

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent implements OnInit{
  userId: any;
  displayedColumns: string[] = ['id', 'startTime', 'endTime', 'totalCost', 'estimatedTime'];
  dataSource!: MatTableDataSource<Ride>;
  rides: Ride[] = [];
  totalElements: number = 0;
  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: any;





  constructor(private rideService: RideService, private router: Router, private storageService:StorageService,
              private route: ActivatedRoute,private driverService:DriverService) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.storageService.getUser().roles[1]==="ROLE_ADMIN") {
        this.rideService.getRidesForUser(this.id)
          .subscribe(data => {
              this.rides = data['results'];
              this.dataSource = new MatTableDataSource<Ride>(this.rides);
              this.totalElements = data['totalCount'];
              console.log(this.rides);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, error =>
            {
              console.log(error.error.message);
            }
          );
      }else if (this.storageService.getUser().roles[1]==="ROLE_DRIVER") {
        this.driverService.driverCheck(this.storageService.getUser().id).subscribe((valid) => {
          if(valid === -1){
            this.router.navigate(['']);
            confirm("You worked more than 8 hours");
            this.storageService.clean();
          }
        });
        this.rideService.getRidesForDriver(this.id)
          .subscribe(data => {
              this.rides = data['results'];
              this.dataSource = new MatTableDataSource<Ride>(this.rides);
              this.totalElements = data['totalCount'];
              console.log(this.rides);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, error =>
            {
              console.log(error.error.message);
            }
          );
      }
    });

  }


}
export interface RideHistoryComponent {
  id: number;
  startTime: string;
  endTime: string;
  totalCost: number;
  estimatedTimeInMinutes: number;
}

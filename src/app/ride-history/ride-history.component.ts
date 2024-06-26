import {Component, OnInit, ViewChild} from '@angular/core';
import {Ride} from "../model/Ride";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {RideService} from "../service/ride/ride.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../service/storage/storage.service";
import {MatTableDataSource} from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import {DriverService} from "../service/driver/driver.service";
import { MatDialog } from '@angular/material/dialog';
import { RideRec } from '../order-ride/order-ride.component';
import { OrderHistoryComponent } from './order-history/order-history/order-history.component';
import {User} from "../model/User";

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent implements OnInit{
  userId!: number;
  displayedColumns: string[] = ['id', 'startTime', 'endTime', 'totalCost', 'estimatedTime'];
  dataSource!: MatTableDataSource<Ride>;
  rides: Ride[] = [];
  totalElements: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;





  constructor(private rideService: RideService, private router: Router, private storageService:StorageService,
              private route: ActivatedRoute,private driverService:DriverService, private dialog: MatDialog) {}
  ngOnInit(): void {
    if (this.storageService.getUser().roles.includes("ROLE_PASSENGER")) {
      this.displayedColumns = ['id', 'startTime', 'endTime', 'totalCost', 'estimatedTime', 'reviews', 'orderAgain'];
    } else if (this.storageService.getUser().roles[1]==="ROLE_ADMIN") {
      this.displayedColumns = ['id', 'startTime', 'endTime', 'totalCost', 'estimatedTime', 'reviews'];
    }
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.storageService.getUser().roles[1]==="ROLE_ADMIN" || this.storageService.getUser().roles.includes("ROLE_PASSENGER")) {
        //let columns: string[] = ['id', 'startTime', 'endTime', 'totalCost', 'estimatedTime', 'reviews'];
        //this.displayedColumns = columns;
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

  viewReviews(obj: User) {
    if (this.storageService.getUser().roles.includes("ROLE_ADMIN")) {
      this.router.navigate(['admin/reviews', obj.id]);
    } else {
     this.router.navigate(['passenger/reviews', obj.id]);
    }
  }

  someDate!: string;
  orderRide(obj: RideRec) {
    let ride: RideRec;
    //let obj: RideRec;
    const dialogRef = this.dialog.open(OrderHistoryComponent, {
      data: {obj: obj, date:this.someDate},
      panelClass: 'my-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) {
        if (result.date!=undefined) {
          ride = {
            "locations": obj.locations,
            "passengers": obj.passengers,
            "vehicleType": obj.vehicleType,
            "babyTransport": obj.babyTransport,
            "petTransport": obj.petTransport,
            "scheduledTime": result.scheduledTime + ":00.000Z"
          };
        } else {
          ride = {
            "locations": obj.locations,
            "passengers": obj.passengers,
            "vehicleType": obj.vehicleType,
            "babyTransport": obj.babyTransport,
            "petTransport": obj.petTransport
          };
        }

    const newRide = this.rideService.createRide(ride).subscribe({
      next: (result) => {
        alert("Ride successfully created!");
        this.router.navigate(['/passenger']);
      },
      error: (error) => {
        if (error.error.message==undefined){
          alert(error.error);
        } else {
          alert(error.error.message);
        }
      },
    });
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

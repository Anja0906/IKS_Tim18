import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {RideService} from "../../service/ride/ride.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../service/storage/storage.service";
import {MatTableDataSource} from "@angular/material/table";
import { MatSort } from '@angular/material/sort';
import {DriverService} from "../../service/driver/driver.service";
import { MatDialog } from '@angular/material/dialog';
import { ReviewService } from 'src/app/service/review/review.service';
import { CommentDialogComponent } from './comment-dialog/comment-dialog/comment-dialog.component';
import { PassengerEmail } from 'src/app/panics/panics.component';
import { RateDriverComponent } from '../rate-driver/rate-driver/rate-driver.component';
import { RateVehicleComponent } from '../rate-vehicle/rate-vehicle/rate-vehicle.component';
import { ReviewSmall, createReview } from 'src/app/model/Review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit{
  userId: any;
  displayedColumns: string[] = ['id', 'passenger_id', 'type', 'rating', 'comment'];
  dataSource!: MatTableDataSource<Review>;
  reviews: Review[] = [];
  totalElements: number = 0;
  ride_id!: number;
  missingReview: boolean = false;
  results: ReviewSet[] = [];
  noComment: boolean = false;
  review!: ReviewSmall;
  @ViewChild(MatPaginator) paginator!: any;
  @ViewChild(MatSort) sort!: any;





  constructor(private reviewService: ReviewService, private router: Router, private storageService:StorageService,
              private route: ActivatedRoute,private driverService:DriverService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.ride_id = this.id;
      if (this.storageService.getUser().roles.includes("ROLE_PASSENGER")) {
        let columns: string[] = ['id', 'type', 'rating', 'comment', 'add-review'];
        this.displayedColumns = columns;
      }
      /*
      this.rideService.getRidesForUser(this.id)
          .subscribe(data => {
              this.rides = data['results'];
              this.dataSource = new MatTableDataSource<Review>(this.rides);
              this.totalElements = data['totalCount'];
              console.log(this.rides);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, error =>
            {
              console.log(error.error.message);
            }
          );
          */
      this.reviewService.getAllReviews(this.ride_id)
      .subscribe(data => {
        this.results = data;
        console.log(this.results);
        this.results.forEach(element => {
          //console.log(element.vehicleReview);
          //console.log(element.driverReview);
          if (element.vehicleReview==null) {
            this.reviews.push({
              "id": -1,
              "rating":-1,
              "comment":"no comment left",
              "type": "vehicle",
              "passenger_id": -1
          });
          } else {
              this.reviews.push({
                  "id": element.vehicleReview.id,
                  "rating":element.vehicleReview.rating,
                  "comment":element.vehicleReview.comment,
                  "type": element.vehicleReview.type,
                  "passenger_id": element.vehicleReview.passenger.id
              });
            }
            if (element.driverReview==null) {
              this.reviews.push({
                "id": -1,
                "rating":-1,
                "comment":"no comment left",
                "type": "driver",
                "passenger_id": -1
            });
            } else {
              this.reviews.push({
                "id": element.driverReview.id,
                "rating":element.driverReview.rating,
                "comment":element.driverReview.comment,
                "type": element.driverReview.type,
                "passenger_id": element.driverReview.passenger.id
            });
              }
        });
        this.dataSource = new MatTableDataSource<Review>(this.reviews);
       })
    });

  }

  addReviews(obj: any) {
    if(obj.type == "driver") {
        this.rateDriver();
    } else {
        this.rateVehicle();
    }
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
        const rep = this.reviewService.addDriverReview(this.ride_id, obj)
        .subscribe(data => {
          console.log(data);
      }, error => {
        alert(error.error.message);
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
        const rep = this.reviewService.addVehicleReview(this.ride_id, obj)
        .subscribe(data => {
            console.log(data);
        }, error => {
          alert(error.error.message);
        }
        );
      }
    });
  }


  viewComment(obj: any) {
    let dialogRef = this.dialog.open(CommentDialogComponent, {
      data: obj,
      panelClass: 'my-dialog-container-class'
    });

    dialogRef.afterClosed().subscribe(
      result => {
      }
    );
  }


}
export interface ReviewsComponent {
  id: number;
  rating: number;
  comment: string;
  type: string;
  passenger_id: number;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  type: string;
  passenger_id: number;
}
 

export interface ReviewRec {
  id: number;
  rating: number;
  comment: string;
  type: string;
  passenger: PassengerEmail;
}

export interface ReviewSet {
  vehicleReview: ReviewRec;
  driverReview: ReviewRec;
}

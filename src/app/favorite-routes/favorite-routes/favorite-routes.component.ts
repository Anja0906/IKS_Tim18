import {Component, Output} from '@angular/core';
import {Router} from "@angular/router";
import { FavoriteRoutesService } from 'src/app/service/favorite-routes/favorite-routes.service';
import { OrderHistoryComponent } from 'src/app/ride-history/order-history/order-history/order-history.component';
import { MatDialog } from '@angular/material/dialog';
import { RideRec } from 'src/app/order-ride/order-ride.component';
import { RideService } from 'src/app/service/ride/ride.service';

@Component({
  selector: 'app-favorite-routes',
  templateUrl: './favorite-routes.component.html',
  styleUrls: ['./favorite-routes.component.css']
})
export class FavoriteRoutesComponent {

  @Output() route!:FavoriteRouteReceive;
  routes!: FavoriteRouteReceive[];
  totalElements: number = 0;
  someDate!: any;



  constructor(private router: Router, private favoriteRoutesService: FavoriteRoutesService, private dialog: MatDialog, private rideService: RideService) {}

  ngOnInit(): void {
    this.getFavRoutes();
  }

  //getting all panic notifications from the backend side
  private getFavRoutes() {
    this.favoriteRoutesService.getAll()
      .subscribe(data => {
          this.routes = data;
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }

  deleteRoute(id: number) {
    this.favoriteRoutesService.deleteFavRide(id)
      .subscribe(data => {
          alert("Successful");
          this.getFavRoutes();
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }

  order(obj: FavoriteRouteReceive) {
    let ride: RideRec;
    const dialogRef = this.dialog.open(OrderHistoryComponent, {
      data: {obj: obj, date:this.someDate},
      panelClass: 'my-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) {
        if (result.scheduledTime!=undefined) {
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


        console.log(ride);
        const newRide = this.rideService.createRide(ride).subscribe({
          next: (result) => {
            console.log(result);
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
        console.log(newRide);
      }
    });
  }

  add() {
    this.router.navigate(['passenger/add-fav-route']);
  }




}


export interface FavoriteRouteSend {
  favoriteName : string;
  locations : Location1[];
  passengers : PassengerEmail[];
  vehicleType : string;
  babyTransport: boolean;
  petTransport: boolean;
}

export interface FavoriteRouteReceive {
  id: number;
  favoriteName : string;
  locations : Location1[];
  passengers : PassengerEmail[];
  vehicleType : string;
  babyTransport: boolean;
  petTransport: boolean;
  scheduledTime? : string;
}

export interface PassengerEmail {
  id: number;
  email: string;
}

export interface Location1 {
  departure: Loc;
  destination: Loc;
}

export interface Loc{
  address: string;
  latitude: number;
  longitude: number;
}

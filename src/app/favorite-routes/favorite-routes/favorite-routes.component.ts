import {Component, Output} from '@angular/core';
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import { FavoriteRoutesService } from 'src/app/service/favorite-routes/favorite-routes.service';

@Component({
  selector: 'app-favorite-routes',
  templateUrl: './favorite-routes.component.html',
  styleUrls: ['./favorite-routes.component.css']
})
export class FavoriteRoutesComponent {

  @Output() route!:FavoriteRouteReceive;
  routes: FavoriteRouteReceive[] = [];
  totalElements: number = 0;


  constructor(private router: Router, private favoriteRoutesService: FavoriteRoutesService) {}

  ngOnInit(): void {
    this.getFavRoutes();
  }

  //getting all panic notifications from the backend side
  private getFavRoutes() {
    this.favoriteRoutesService.getAll()
      .subscribe(data => {
          // @ts-ignore
          this.routes = data;
          console.log(data);
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }

  deleteRoute(id: number) {
    this.favoriteRoutesService.deleteFavRide(id)
      .subscribe(data => {
          // @ts-ignore
          alert("Successful");
          this.getFavRoutes();
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }

  order(route:any) {

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


import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";
import {Panic} from "../../panics/panics.component";
import {Ride} from "../../model/Ride";
import {FavoriteRouteReceive} from "../../favorite-routes/favorite-routes/favorite-routes.component";

@Injectable({
  providedIn: 'root'
})
export class FavoriteRoutesService {


  constructor(private http: HttpClient) {
  }



  getAll(): Observable<FavoriteRouteReceive[]> {
    return this.http.get<FavoriteRouteReceive[]>(environment.apiHost + 'api/ride/favorites');
  }

  createFavRide(favoriteRide: any): Observable<FavoriteRouteReceive> {
    return this.http.post<FavoriteRouteReceive>(environment.apiHost + 'api/ride/favorites', favoriteRide);
  }

  deleteFavRide(rideId: number): Observable<FavoriteRouteReceive> {
    return this.http.delete<FavoriteRouteReceive>(environment.apiHost + 'api/ride/favorites/' + rideId);
  }


}

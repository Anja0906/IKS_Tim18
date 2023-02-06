import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";
import {Panic} from "../../panics/panics.component";

@Injectable({
  providedIn: 'root'
})
export class FavoriteRoutesService {

  private apiServerUrl = environment.apiHost;

  constructor(private http: HttpClient) {
  }

  panics: any[] = [];


  getAll(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiHost + 'api/ride/favorites');
  }

  createFavRide(favoriteRide: any): Observable<any> {
    return this.http.post<any>(environment.apiHost + 'api/ride/favorites', favoriteRide);
  }

  deleteFavRide(rideId: number): Observable<any> {
    return this.http.delete<any>(environment.apiHost + 'api/ride/favorites/' + rideId);
  }

  
}

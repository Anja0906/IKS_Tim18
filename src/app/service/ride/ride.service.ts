import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ride} from "../../model/Ride";
import {Reason} from "../../model/Reason";
import {Panic} from "../../model/Panic";

@Injectable({
  providedIn: 'root'
})
export class RideService {

  private apiServerUrl = environment.apiHost;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {}

  public getRide(rideId: number): Observable<Ride> {
    return this.http.get<Ride>(`${this.apiServerUrl}api/ride/${rideId}`);
  }
  public getActiveRide(driverId: number): Observable<Ride> {
    return this.http.get<Ride>(`${this.apiServerUrl}api/ride/driver/${driverId}/active`);
  }

  public getPendingRides(): Observable<Ride> {
    return this.http.get<Ride>(`${this.apiServerUrl}api/ride/pending`);
  }

  public getRidesForDriver(id: number): Observable<any> {
    return this.http.get<Ride>(environment.apiHost + `api/driver/2/ride?page=0&size=100`);
  }
  public activatePanic(id: number,reason:Reason): Observable<any> {
    return this.http.put<Panic>(environment.apiHost + `api/driver/ride/${id}/panic`,reason);
  }
  public rejectRide(id: number,reason:Reason): Observable<any> {
    return this.http.put<Ride>(environment.apiHost + `api/driver/ride/${id}/cancel`,reason);
  }
}

import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ride} from "../../model/Ride";
import {Reason} from "../../model/Reason";
import {Panic} from "../../model/Panic";
import { RideRet } from 'src/app/panics/panics.component';
import { RideRec } from 'src/app/order-ride/order-ride.component';

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
    return this.http.get<Ride>(environment.apiHost + `api/driver/${id}/ride?page=0&size=100`);
  }

  public getRidesForUser(id: number): Observable<any> {
    return this.http.get<Ride>(environment.apiHost + `api/user/${id}/ride?page=0&size=100`);
  }
  public activatePanic(id: number,reason:Reason): Observable<any> {
    return this.http.put<Panic>(`${this.apiServerUrl}api/ride/${id}/panic`,reason);
  }
  public rejectRide(id: number,reason:Reason): Observable<any> {
    return this.http.put<Ride>(`${this.apiServerUrl}api/ride/${id}/cancel`,reason);
  }
  public acceptRide(id: number): Observable<any> {
    return this.http.put<Ride>(`${this.apiServerUrl}api/ride/${id}/accept`,null);
  }
  public createRide(rideRec: any): Observable<any> {
    return this.http.post<any>(environment.apiHost + 'api/ride', rideRec);
  }

  public getActiveRideForPassenger(passengerId: number): Observable<Ride> {
    return this.http.get<Ride>(`${this.apiServerUrl}api/ride/passenger/${passengerId}/active`);
  }

  public withdrawRide(id: number): Observable<any> {
    return this.http.put<Ride>(environment.apiHost + `api/ride/${id}/withdraw`, null);
  }

  public startRide(id: number): Observable<any> {
    return this.http.put<Ride>(environment.apiHost + `api/ride/${id}/start`, null);
  }

}

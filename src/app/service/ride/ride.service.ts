import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../model/User";
import {Ride} from "../../model/Ride";

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
}

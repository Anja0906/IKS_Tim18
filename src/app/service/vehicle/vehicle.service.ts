import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Driver} from "../../model/Driver";
import {environment} from "../../../environments/environment";
import {Vehicle} from "../../model/Vehicle";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient) { }
  add(vehicle: Vehicle, driverId:number): Observable<Vehicle> {
    vehicle.currentLocation = {
      address: "",
      latitude: 45.5454,
      longitude: 19.4545
    }
    console.log(vehicle);
    return this.http.post<Vehicle>(environment.apiHost + 'api/driver/' + driverId + '/vehicle', vehicle);
  }
}

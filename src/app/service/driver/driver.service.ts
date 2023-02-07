import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Driver} from "../../model/Driver";
import {Vehicle} from "../../model/Vehicle";
import {DriverDocument} from "../../model/DriverDocument";
import {Ride} from "../../model/Ride";
import {WorkingHour} from "../../model/WorkingHour";

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  constructor(private http: HttpClient) { }
  drivers: Driver[] = [];
  add(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(environment.apiHost + 'api/driver', driver);
  }
  getAll(request: { page?: string; size?: string }): Observable<{totalCount:number, results:Driver[]}> {
    return this.http.get<{totalCount:number, results:Driver[]}>(environment.apiHost + 'api/driver?page='+request['page']+'&size='+request['size']);
  }
  getDriver(id:number): Observable<Driver>{
    return this.http.get<Driver>(environment.apiHost + 'api/driver/'+id);
  }
  getVehicleForDriver(id:number): Observable<Vehicle> {
    return this.http.get<Vehicle>(environment.apiHost + 'api/driver/'+id+'/vehicle');
  }
  getDocumentsForDriver(id:number): Observable<DriverDocument[]> {
    return this.http.get<DriverDocument[]>(environment.apiHost + 'api/driver/'+id+'/documents');
  }
  driverOnline(id:number): Observable<void> {
    return this.http.get<void>(environment.apiHost + `api/driver/online/${id}`);
  }
  driverOffline(id:number): Observable<void> {
    return this.http.get<void>(environment.apiHost + `api/driver/offline/${id}`);
  }
  driverCheck(driverId:number): Observable<any>{
    return this.http.get<any>(environment.apiHost + `api/driver/working-hour/${driverId}/logged`);
  }
  workingHourValidation(driverId:number): Observable<any>{
    return this.http.get<any>(environment.apiHost + `api/driver/working-hour/${driverId}/login`);
  }
  workingHourValidationLogout(driverId:number): Observable<any>{
    return this.http.get<any>(environment.apiHost + `api/driver/working-hour/${driverId}/logout`);
  }
  addWorkingHour(driverId:number): Observable<WorkingHour>{
    return this.http.post<WorkingHour>(environment.apiHost + `api/driver/${driverId}/working-hour`,null);
  }

}


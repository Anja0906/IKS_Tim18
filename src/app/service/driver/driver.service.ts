import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Driver} from "../../model/Driver";
import {Vehicle} from "../../model/Vehicle";
import {DriverDocument} from "../../model/DriverDocument";

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  constructor(private http: HttpClient) { }
  drivers: any[] = [];
  add(driver: any): Observable<Driver> {
    return this.http.post<Driver>(environment.apiHost + 'api/driver', driver);
  }
  getAll(request: { page?: string; size?: string }): Observable<any[]> {
    return this.http.get<any[]>(environment.apiHost + 'api/driver?page='+request['page']+'&size='+request['size']);
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

}


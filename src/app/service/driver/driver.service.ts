import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Driver} from "../../model/Driver";

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
}


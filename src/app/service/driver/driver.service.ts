import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Driver} from "../../register-driver/register-driver.component";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  constructor(private http: HttpClient) { }
  drivers: any[] = [];
  add(driver: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.post<string>(environment.apiHost + 'api/driver', driver, options);
  }


  getAll(request: { page?: string; size?: string }): Observable<any[]> {
    return this.http.get<any[]>(environment.apiHost + 'api/driver?page='+request['page']+'&size='+request['size']);
  }
}

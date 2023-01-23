import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  users: any[] = [];

  userOnline(id:number): Observable<any> {
    return this.http.get<any>(environment.apiHost + `api/user/online/${id}`);
  }
  userOffline(id:number): Observable<any> {
    return this.http.get<any>(environment.apiHost + `api/user/offline/${id}`);
  }
}

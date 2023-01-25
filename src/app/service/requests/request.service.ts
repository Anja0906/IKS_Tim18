import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {DriverDocument} from "../../model/DriverDocument";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/User";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getRequests(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiHost + 'api/request');
  }

  deleteReq(id: number) {
    return this.http.put(environment.apiHost + `api/request/${id}`, {});
  }
}

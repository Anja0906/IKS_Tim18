import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";
import {Panic} from "../../panics/panics.component";
import {Ride} from "../../model/Ride";

@Injectable({
  providedIn: 'root'
})
export class PanicService {

  private apiServerUrl = environment.apiHost;

  constructor(private http: HttpClient) {
  }

  panics: Panic[] = [];


  getAll(request: { page?: string; size?: string }): Observable<{totalCount:number, results:Panic[]}> {
    return this.http.get<{totalCount:number, results:Panic[]}>(environment.apiHost + 'api/panic?page=' + request['page'] + '&size=' + request['size']);
  }

  public getPanic(panicId: number): Observable<Panic> {
    return this.http.get<Panic>(`${this.apiServerUrl}api/panic/${panicId}`);
  }
}

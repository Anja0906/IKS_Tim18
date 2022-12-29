import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../../model/User";
import {Panic} from "../../panics/panics.component";

@Injectable({
  providedIn: 'root'
})
export class PanicService {

  private apiServerUrl = environment.apiHost;

  constructor(private http: HttpClient) {
  }

  panics: any[] = [];


  getAll(request: { page?: string; size?: string }): Observable<any[]> {
    return this.http.get<any[]>(environment.apiHost + 'api/panic?page=' + request['page'] + '&size=' + request['size']);
  }

  public getPanic(panicId: number): Observable<Panic> {
    return this.http.get<Panic>(`${this.apiServerUrl}api/panic/${panicId}`);
  }
}

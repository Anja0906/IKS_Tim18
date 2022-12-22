import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PanicService {

  constructor(private http: HttpClient) {
  }

  panics: any[] = [];


  getAll(request: { page?: string; size?: string }): Observable<any[]> {
    return this.http.get<any[]>(environment.apiHost + 'api/panic?page=' + request['page'] + '&size=' + request['size']);
  }
}

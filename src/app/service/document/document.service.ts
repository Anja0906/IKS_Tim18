import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DriverDocument} from "../../model/DriverDocument";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(private http: HttpClient) { }
  add(document: DriverDocument, driverId:number): Observable<DriverDocument> {
    return this.http.post<DriverDocument>(environment.apiHost + 'api/driver/' + driverId + '/documents', document);
  }
}

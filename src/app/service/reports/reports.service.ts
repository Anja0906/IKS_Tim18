import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Report} from "../../model/Report";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  getReportsForUser(id: number, request: { size: string; from: string | null; page: string; to: any }): Observable<Report> {
    return this.http.get<Report>(environment.apiHost + `api/reports/${id}/user?page=`+request['page']+'&size='+request['size']+'&from='+request['from']+'&to='+request['to']);
  }

  getReportsForAdmin(request: { size: string; from: string | null; page: string; to: any }): Observable<Report> {
    return this.http.get<Report>(environment.apiHost + `api/reports/all?page=`+request['page']+'&size='+request['size']+'&from='+request['from']+'&to='+request['to']);
  }
}

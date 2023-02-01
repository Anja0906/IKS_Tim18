import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Review } from 'src/app/model/Review';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiServerUrl = environment.apiHost;
  constructor(private http: HttpClient) { }

   public addDriverReview(id: number, review:any): Observable<any> {
    console.log("eee d");
    console.log(review);
    console.log(`${this.apiServerUrl}api/review/${id}/driver`)
    return this.http.post<any>(`${this.apiServerUrl}api/review/${id}/driver`, review);
  }

  public addVehicleReview(id: number, review:any): Observable<any> {
    console.log("eee v");
    console.log(review);
    return this.http.post<any>(`${this.apiServerUrl}api/review/${id}/vehicle`, review);
  }

}

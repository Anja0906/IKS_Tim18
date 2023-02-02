import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Review } from 'src/app/reviews/reviews/reviews.component';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiServerUrl = environment.apiHost;
  constructor(private http: HttpClient) { }

  public addDriverReview(id: number, review:any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}api/review/${id}/driver`, review);
  }

  public addVehicleReview(id: number, review:any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}api/review/${id}/vehicle`, review);
  }

  public getAllReviews(id: number): Observable<any> {
    return this.http.get<Review>(`${this.apiServerUrl}api/review/${id}`);
  }

}

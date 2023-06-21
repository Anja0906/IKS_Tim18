import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Review, ReviewSet} from 'src/app/reviews/reviews/reviews.component';
import {environment} from "../../../environments/environment";
import {ReviewSmall} from "../../model/Review";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiServerUrl = environment.apiHost;
  constructor(private http: HttpClient) { }

  public addDriverReview(id: number, review:ReviewSmall): Observable<Review> {
    return this.http.post<Review>(`${this.apiServerUrl}api/review/${id}/driver`, review);
  }

  public addVehicleReview(id: number, review:ReviewSmall): Observable<Review> {
    return this.http.post<Review>(`${this.apiServerUrl}api/review/${id}/vehicle`, review);
  }

  public getAllReviews(id: number): Observable<ReviewSet[]> {
    return this.http.get<ReviewSet[]>(`${this.apiServerUrl}api/review/${id}`);
  }

}

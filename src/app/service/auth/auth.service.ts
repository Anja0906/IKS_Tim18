import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.apiHost + 'api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        email,
        password,
      },
      httpOptions
    )
    ;
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', { }, httpOptions);
  }

  signUpPassenger(name: string, profilePicture: string, email: string, surname: string, address: string, telephoneNumber: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signupPassenger',
      {
        name, surname, profilePicture, telephoneNumber, email, address, password
      },
      httpOptions
    )
    ;
  }

}

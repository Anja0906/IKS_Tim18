import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';
import {environment} from "../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiHost;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {}


  getAll(request: { page?: string; size?: string }): Observable<any[]> {
    return this.http.get<any[]>(environment.apiHost + 'api/user?page=' + request['page'] + '&size=' + request['size']);
  }

  public getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}api/user/${userId}`);
  }

  public addUser(user: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.post<string>(`${this.apiServerUrl}api/user/add`, user, options);

  }

  public updateUser(id: number, user: User) {
    return this.http.put<User>(`${this.apiServerUrl}api/user/${id}`, user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
  }

  unblock(id: number) {
    const body = { title: 'Unblocking' };
    // @ts-ignore
    return this.http.put<string>(`${this.apiServerUrl}api/user/${id}/unblock`);
  }

  block(id: number){
    const body = { title: 'Blocking' };
    // @ts-ignore
    return this.http.put<string>(`${this.apiServerUrl}api/user/${id}/block`);
  }

}

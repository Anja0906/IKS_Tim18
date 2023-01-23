import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Note} from "../../model/Note";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RejectService {

  constructor(private http: HttpClient) { }
  addNote(message: string, id: number){
    const note: Note = {
      message: message
    };
    this.http.post(environment.apiHost+`api/user/${id}/note`, note).subscribe(response => {
      console.log(response);
    });
  }
}

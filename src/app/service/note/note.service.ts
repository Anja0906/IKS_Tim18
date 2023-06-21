import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Note} from "../../model/Note";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }
  addNote(message: string, id: number){
    const note: Note = {
      message: message
    };
    this.http.post(environment.apiHost+`api/user/${id}/note`, note).subscribe(response => {
    });
  }
}

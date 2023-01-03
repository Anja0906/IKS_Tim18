import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {UserSimple} from "../panics/panics.component";
import {UserService} from "../user.service";
import {MatDialog} from "@angular/material/dialog";
import {NoteComponent} from "./note/note.component";
import {MessageComponent} from "./messages/messages/messages.component";
import {Note} from "../model/Note";

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.css']
})
export class BlockedUsersComponent {
  notes: Note[] = [];
  users: UserSimple[] = [];
  totalElements: number = 0;
  result: any;

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsers({ page: "0", size: "30" });
  }

  //getting all users from backend
  private getUsers(request: { page?: string; size?: string; }) {
    this.userService.getAll(request)
      .subscribe(data => {
          // @ts-ignore
          this.users = data['results'];
          // @ts-ignore
          this.totalElements = data['totalCount'];
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }

  //getting all notes for some id from backend
  private getNotes(id:number) {
    this.userService.getMessages(id, { page: '0', size: '10' }).subscribe(
      (data) => {
        // @ts-ignore
        this.notes = data['results'];
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  //changing page
  nextPage(event: PageEvent) {
    const request = {};
    // @ts-ignore
    request['page'] = event.pageIndex.toString();
    // @ts-ignore
    request['size'] = event.pageSize.toString();
    this.getUsers(request);
  }

  //blocking user
  block(id: number){
    this.userService
      .block(id)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  //unblocking user
  unblock(id: number){
    this.userService
      .unblock(id)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  //mat dialog to leave note
  openDialog(id: number) {
    const dialogRef = this.dialog.open(NoteComponent, {
      data: id,
      panelClass: 'my-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.result = result;
    });

  }

  //mat dialog to open notes from back
  openMessages(id: number) {
    this.getNotes(id);
    const dialogRef = this.dialog.open(MessageComponent, {
      data: this.notes,
      panelClass: 'my-dialog-container-class',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.result = result;
    });

  }

}

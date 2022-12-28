import { Component } from '@angular/core';
import {PanicService} from "../service/panic/panic.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {Panic, UserSimple} from "../panics/panics.component";
import {UserService} from "../user.service";

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.css']
})
export class BlockedUsersComponent {
  users: UserSimple[] = [];
  totalElements: number = 0;

  constructor(private userService: UserService, private router: Router) {}

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

}

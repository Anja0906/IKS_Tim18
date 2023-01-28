import { Component } from '@angular/core';
import {UserSimple} from "../panics/panics.component";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-ride-history',
  templateUrl: './users-ride-history.component.html',
  styleUrls: ['./users-ride-history.component.css']
})
export class UsersRideHistoryComponent {

  users: UserSimple[] = [];
  totalElements: number = 0;
  searchTerm = '';
  term = '';

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



  openHistory(id:number) {
    this.router.navigate(['/admin/ride-history', id ]);
  }

  openStats(id:number) {
    this.router.navigate(['/admin/stats', id ]);
  }
}

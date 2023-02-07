import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {User} from "../model/User";
import {RequestService} from "../service/requests/request.service";
import {DriverDocument} from "../model/DriverDocument";
import {UserService} from "../user.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit{

  requests!:User[];
  constructor(private requestService:RequestService, private userService: UserService) {
  }

  displayedColumns: string[] = ['id', 'name', 'surname', 'telephone number', 'email', 'address', 'actions'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.requestService.getRequests().subscribe(requests => {
      this.requests = requests;
      this.dataSource.data = requests;
      console.log(this.requests);
    });
  }

  accept(user:User) {
    this.userService.updateUser(user.id, user).subscribe(() => {
      });
    console.log(user);
    this.deleteRequest(user);
  }

  deleteRequest(user:User){
    const index: number = this.dataSource.data.indexOf(user);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
  }

  decline(user:User) {
    this.requestService.deleteReq(user.id).subscribe(() => {
      });
    this.deleteRequest(user);
  }
}
const ELEMENT_DATA: User[] = [];

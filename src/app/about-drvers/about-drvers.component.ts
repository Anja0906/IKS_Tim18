import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DriverService} from "../service/driver/driver.service";
import {Router} from "@angular/router";
import {Driver} from "../model/Driver";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-about-drvers',
  templateUrl: './about-drvers.component.html',
  styleUrls: ['./about-drvers.component.css']
})
export class AboutDrversComponent implements OnInit {
  drivers: Driver[] = [];
  totalElements: number = 0;

  createDriverForm = new FormGroup({
    profilePicture: new FormControl(),
    name: new FormControl(),
    licence: new FormControl(),
    surname: new FormControl(),
    vehicleRegistration: new FormControl(),
    telephoneNumber: new FormControl(),
    address: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private driverService: DriverService, private router: Router) {}

  ngOnInit(): void {
    this.getDrivers({ page: "0", size: "10" });
  }

  add() {
    if (this.createDriverForm.valid) {
      this.driverService
        .add(this.createDriverForm.value)
        .subscribe((res: any) => {
          console.log(res);
          this.router.navigate(['']);
        });
    }
  }

  private getDrivers(request: { page?: string; size?: string; }) {
    this.driverService.getAll(request)
      .subscribe(data => {
          // @ts-ignore
          this.drivers = data['results'];
          // @ts-ignore
          this.totalElements = data['totalCount'];
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }

  nextPage(event: PageEvent) {
    const request = {};
    // @ts-ignore
    request['page'] = event.pageIndex.toString();
    // @ts-ignore
    request['size'] = event.pageSize.toString();
    this.getDrivers(request);
  }

}

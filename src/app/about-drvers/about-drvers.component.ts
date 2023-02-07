import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DriverService} from "../service/driver/driver.service";
import {Router} from "@angular/router";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Driver} from "../model/Driver";

@Component({
  selector: 'app-about-drvers',
  templateUrl: './about-drvers.component.html',
  styleUrls: ['./about-drvers.component.css']
})
export class AboutDrversComponent implements OnInit {
  drivers: Driver[] = [];
  totalElements: number = 0;
  searchTerm = '';
  term = '';
  driver!: Driver;

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
      this.driver.profilePicture = this.createDriverForm.value.profilePicture;
      this.driver.name = this.createDriverForm.value.name;
      this.driver.surname = this.createDriverForm.value.surname;
      this.driver.telephoneNumber = this.createDriverForm.value.telephoneNumber;
      this.driver.address = this.createDriverForm.value.address;
      this.driver.email = this.createDriverForm.value.email;
      this.driver.password = this.createDriverForm.value.password;
      this.driverService
        .add(this.driver)
        .subscribe(() => {
          this.router.navigate(['']);
        });
    }
  }

  private getDrivers(request: { page?: string; size?: string; }) {
    this.driverService.getAll(request)
      .subscribe(data => {
          this.drivers = data['results'];
          this.totalElements = data['totalCount'];
        }
        , error => {
          console.log(error.error.message);
        }
      );
  }


  public onCardClick(driver: Driver){
    this.router.navigate(['/admin/about-driver', driver.id ]);
  }
}

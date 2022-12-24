import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DriverService} from "../service/driver/driver.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-driver',
  templateUrl: './register-driver.component.html',
  styleUrls: ['./register-driver.component.css']
})
export class RegisterDriverComponent implements OnInit {
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

  ngOnInit(): void {}

  add() {
    if (this.createDriverForm.valid) {
      this.driverService
        .add(this.createDriverForm.value)
        .subscribe((res: any) => {
          console.log(res);
          this.router.navigate(["all-drivers"])
        });
    }
  }
}

export interface Driver {
  _id: number;
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  password: string;
  address: string;
}


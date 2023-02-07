import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Route, Router} from '@angular/router';
import { UserService } from 'src/app/user.service';

import { AuthService } from '../service/auth/auth.service';
import { StorageService } from '../service/storage/storage.service';
import {User} from "../model/User";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerUserForm!:FormGroup;
  submitted = false;
  form: { profilePicture: string; password: string; address: string; telephoneNumber: string; surname: string; name: string; email: string } = {
    name: "",
    profilePicture: "",
    email: "",
    surname: "",
    address: "",
    telephoneNumber: "",
    password: ""
  };
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private storageService: StorageService,private route:Router) {}

  ngOnInit() {
    this.registerUserForm = this.formBuilder.group({
      email:["", Validators.required],
      password:["", Validators.required]
    })
  }

  onSubmit() {

    this.authService.signUpPassenger(this.form.name, this.form.profilePicture, this.form.email, this.form.surname,
      this.form.address, this.form.telephoneNumber, this.form.password).subscribe({
      next: data => {
        alert("successful");
        this.route.navigate(['']);
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }

}

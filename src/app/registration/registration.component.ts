import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

import { AuthService } from '../service/auth/auth.service';
import { StorageService } from '../service/storage/storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerUserForm!:FormGroup;
  submitted = false;
  form: any = {
    firstName: null,
    picture: null,
    email: null,
    lastName: null,
    address: null,
    telephoneNumber: null,
    password: null
  };
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private storageService: StorageService) {}

  ngOnInit() {
    this.registerUserForm = this.formBuilder.group({
      email:["", Validators.required],
      password:["", Validators.required]
    })
  }

  onSubmit() {
    const { firstName, picture, email, lastName, address, telephoneNumber, password } = this.form;
    this.authService.signUpPassenger(firstName, picture, email, lastName, address, telephoneNumber, password).subscribe({
      next: data => {
        console.log("hi");
        //this.storageService.saveUser(data);

        alert("successful");

        //this.reloadPage();
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

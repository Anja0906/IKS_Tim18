import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { AuthService } from '../service/auth/auth.service';
import { StorageService } from '../service/storage/storage.service';

import {Router} from '@angular/router';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private storageService: StorageService, private loginRouter: Router) {}

  hasError: boolean = false;
  valid : boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  isLoggedIn = false;
  isLoginFailed = false;
  submitted = false;
  errorMessage = '';
  roles: string[] = [];
  name: string[] = [];

  onSubmit() {
    let loginVal = {
      username: this.loginForm.value.email?.toString(),
      password: this.loginForm.value.password?.toString(),
    };


    if (this.loginForm.valid) {
      this.valid = true;
      let email = loginVal?.username;
      let password = loginVal?.password;

    // @ts-ignore
      this.authService.login(email, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        console.log("successful login");
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.name = this.storageService.getUser().details;
        if (this.roles.includes("ROLE_ADMIN")) {
          this.loginRouter.navigate(['/admin']);
        }
        if (this.roles.includes("ROLE_DRIVER")) {
          this.loginRouter.navigate(['/driver']);
        }
        if (this.roles.includes("ROLE_PASSENGER")) {
          this.loginRouter.navigate(['/passenger']);
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.name = this.storageService.getUser().details;
    }
  }
 }

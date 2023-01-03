import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../service/auth/auth.service';
import { StorageService } from '../service/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  submitted = false;
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  name: string[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private storageService: StorageService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:["", Validators.required]
    })
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.name = this.storageService.getUser().details;
    }
  }

  onSubmit() {
    const { email, password } = this.form;
    /*
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    alert("Successful");
    */
    this.authService.login(email, password).subscribe({
      next: data => {
        console.log("hi");
        this.storageService.saveUser(data);

        console.log("successful login");
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.name = this.storageService.getUser().details;
        console.log(this.roles);

        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
 }

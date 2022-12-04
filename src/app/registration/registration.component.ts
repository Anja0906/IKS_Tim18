import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registerUserForm = new FormGroup({
    imageFile: new FormControl(),
    firstName: new FormControl(),
    email: new FormControl('', [Validators.required]),
    lastName: new FormControl(),
    address: new FormControl(),
    telephoneNumber: new FormControl(),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  add() {
    if (this.registerUserForm.valid) {
      this.userService
        .addUser(this.registerUserForm.value)
        .subscribe((res: any) => {
          console.log(res);
          this.router.navigate(['user']);
        });
    }
  }
}

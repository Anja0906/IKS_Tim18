import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

import { AuthService } from '../service/auth/auth.service';
import { StorageService } from '../service/storage/storage.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  submitted = false;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    profilePicture: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    surname: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    telephoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  hasError: boolean = false;
  valid : boolean = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private storageService: StorageService,private route:Router) {}

  ngOnInit() {
  }

  onSubmit() {
    let registerVal = {
      name: this.form.value.name?.toString(),
      profilePicture: this.form.value.profilePicture?.toString(),
      email: this.form.value.email?.toString(),
      surname: this.form.value.surname?.toString(),
      address: this.form.value.address?.toString(),
      telephoneNumber: this.form.value.telephoneNumber?.toString(),
      password: this.form.value.password?.toString()
    };
    if (this.form.valid){
      this.valid = true;
      let name = registerVal?.name;
      let profilePicture = registerVal?.profilePicture;
      let email = registerVal?.email;
      let surname = registerVal?.surname;
      let address = registerVal?.address;
      let telephoneNumber = registerVal?.telephoneNumber;
      let password = registerVal?.password;
      console.log(registerVal);
      // @ts-ignore
      this.authService.signUpPassenger(name, profilePicture,
        email, surname, address,
        telephoneNumber, password).subscribe({
        next: data => {
          alert("successful");
          this.route.navigate(['']);
        },
        error: err => {
          this.errorMessage = err.error.message;
        }
      });
    }
  }

}

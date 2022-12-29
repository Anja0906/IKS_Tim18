import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {User} from "../model/User";


export interface IUserFormGroup extends FormGroup {
  value: User;
  controls: {
    email: FormControl;
    password: FormControl;
    address: FormControl;
    name: FormControl;
    profilePicture: FormControl;
    surname: FormControl;
    telephoneNumber: FormControl;
  };
}

@Component({
  selector: 'app-my-profile-info',
  templateUrl: './my-profile-info.component.html',
  styleUrls: ['./my-profile-info.component.css']
})

export class MyProfileInfoComponent implements OnInit {
  user!: User;
  form!: IUserFormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  //setting the form and user information
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
      address: [''],
      name: [''],
      profilePicture: [''],
      surname: [''],
      telephoneNumber: [''],
    }) as IUserFormGroup;
    this.userService.getUser(1).subscribe((res) => {
      this.user = res;
      // console.log(this.user);
      this.form.patchValue(res);
    });
    this.form.patchValue(this.user);
  }

  //submitting the form and updating user on the backend side
  update() {
    if (this.form.valid) {
      this.userService
        .updateUser(1, this.form.value)
        .subscribe((res: any) => {
          console.log(res);
          this.router.navigate([this])
        });
      this.userService.getUser(1).subscribe((res) => {
        this.user = res;
        this.form.patchValue(res);
      });
    }
  }
}


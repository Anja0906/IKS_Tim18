import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {User} from "../model/User";
import {StorageService} from "../service/storage/storage.service";
import {ChangePassword} from "../model/ChangePassword";


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

export interface IChangePassword extends FormGroup{
  value: ChangePassword;
  controls: {
    oldPassword: FormControl;
    newPassword: FormControl;
    newPassword2: FormControl;
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
  changePasswordForm!:IChangePassword;
  change=false;
  displayUser=true;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private storageService: StorageService, private router: Router) { }

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
    const loggedUser = this.storageService.getUser();
    this.userService.getUser(loggedUser.id).subscribe((res) => {
      this.user = res;
      // console.log(this.user);
      this.form.patchValue(res);
    });
    this.form.patchValue(this.user);
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [''],
      newPassword: [''],
      newPassword2: [''],
    }) as IChangePassword;
  }

  //submitting the form and updating user on the backend side
  update() {
    if (this.form.valid) {
      const loggedUser = this.storageService.getUser();
      if (loggedUser.roles.includes("ROLE_DRIVER")){
        this.userService
          .updateDriver(loggedUser.id, this.form.value)
          .subscribe((res: any) => {
            console.log(res);
            this.router.navigate([this])
          });
      }else {
        this.userService
          .updateUser(loggedUser.id, this.form.value)
          .subscribe((res: any) => {
            console.log(res);
            this.router.navigate([this])
          });
      }
      this.userService.getUser(loggedUser.id).subscribe((res) => {
        this.user = res;
        this.form.patchValue(res);
      });
    }
  }

  changePassword() {
    this.change = true;
    this.displayUser = false;
  }

  submitPassword() {
    const loggedUser = this.storageService.getUser();
    if (this.changePasswordForm.valid) {
      if(this.changePasswordForm.controls.newPassword.value===this.changePasswordForm.controls.newPassword2.value){
        console.log(this.changePasswordForm.value);
        this.userService.changePassword(loggedUser.id, this.changePasswordForm.value).subscribe(
          () => {
            console.log(this.changePasswordForm.value);
            this.change = false;
            this.displayUser = true;
          }
        );
      }
    }
  }
}


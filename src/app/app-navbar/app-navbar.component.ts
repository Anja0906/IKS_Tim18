import {Component, EventEmitter, Output, TemplateRef, ViewChild} from '@angular/core';

import {AuthService} from '../service/auth/auth.service';
import {StorageService} from '../service/storage/storage.service';
import {Router} from '@angular/router';
import {map} from 'leaflet';
import {DriverService} from "../service/driver/driver.service";
import {WorkingHour} from "../model/WorkingHour";

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent {
  btnVal = "Online";
  btnCall = "activeButtonOnline";
  isLoggedIn = false;
  isNotLoggedIn = true;
  isDriver = false;
  workingHour!: WorkingHour;

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router, private driverService: DriverService) {
  }


  homePage() {
    if (this.storageService.getUser().roles.includes("ROLE_DRIVER")) {
      this.router.navigate(['driver']);
    } else if (this.storageService.getUser().roles.includes("ROLE_ADMIN")) {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['passenger']);
    }
  }

  ngOnInit(): void {
    let user = this.storageService.getUser();
    let roles = user.roles;
    this.isNotLoggedIn = (roles === undefined);
    this.isLoggedIn = !this.isNotLoggedIn;
    if (roles !== undefined) {
      if (roles.includes("ROLE_DRIVER")) {
        this.isDriver = true;
        this.driverService.workingHourValidation(this.storageService.getUser().id).subscribe((res) => {
          if (res === -1) {
            confirm("You worked more than 8 hours");
            this.router.navigate(['']);
            this.storageService.clean();
          } else if (res === 0) {
            this.driverService.addWorkingHour(this.storageService.getUser().id).subscribe((workingHour) => {
              this.driverService.driverOnline(this.storageService.getUser().id).subscribe(() => {
                this.workingHour = workingHour;
                this.router.navigate(['driver']);
              });
            });
          } else {
            this.driverService.driverOnline(this.storageService.getUser().id).subscribe(() => {
              this.workingHour = res;
              this.router.navigate(['driver']);
            });
          }
        });
      }
    }
  }

  changeActivity() {
    if (this.btnVal === "Online") {
      this.btnVal = "Offline";
      this.btnCall = "activeButtonOffline"
      this.driverService.workingHourValidationLogout(this.storageService.getUser().id).subscribe(() => {});
      this.driverService.driverOffline(this.storageService.getUser().id).subscribe(() => {
      });
    } else {
      this.btnVal = "Online"
      this.btnCall = "activeButtonOnline"
      this.driverService.workingHourValidation(this.storageService.getUser().id).subscribe((res) => {
        if (res === -1) {
          confirm("You worked more than 8 hours");
          this.router.navigate(['']);
          this.storageService.clean();
        }
      });
      this.driverService.driverOnline(this.storageService.getUser().id).subscribe(() => {
      });
    }
  }

  logout(): void {
    if (this.isDriver) {
      this.driverService.workingHourValidationLogout(this.storageService.getUser().id).subscribe(() => {});
      this.driverService.driverOffline(this.storageService.getUser().id).subscribe(() => {
      });
    }
    this.storageService.clean();
    this.router.navigate(['home']);
  }
}

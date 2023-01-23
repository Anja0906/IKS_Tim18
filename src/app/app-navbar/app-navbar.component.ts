import {Component, EventEmitter, Output, TemplateRef, ViewChild} from '@angular/core';

import { AuthService } from '../service/auth/auth.service';
import { StorageService } from '../service/storage/storage.service';
import {Router} from '@angular/router';
import { map } from 'leaflet';
import {DriverService} from "../service/driver/driver.service";

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent {
  btnVal = "Online";
  btnCall="activeButtonOnline";
  isLoggedIn = false;
  isNotLoggedIn = true;
  isDriver=false;

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router,private driverService:DriverService) { }


  homePage() {
    if(this.storageService.getUser().roles.includes("ROLE_DRIVER")){
      this.router.navigate(['driver']);
    }else if(this.storageService.getUser().roles.includes("ROLE_ADMIN")){
      this.router.navigate(['admin']);
    }else{
      this.router.navigate(['passenger']);
    }

  }
  ngOnInit(): void {
    let user = this.storageService.getUser();
    let roles = user.roles;
    this.isNotLoggedIn = (roles === undefined);
    this.isLoggedIn = !this.isNotLoggedIn;
    if (roles !== undefined) {
      if (roles.includes("ROLE_DRIVER")){
        this.isDriver = true;
        this.driverService.driverOnline(this.storageService.getUser().id).subscribe(() => {
          console.log(this.storageService.getUser().id)
        });
      }
      }
  }

  changeActivity()
  {
    if(this.btnVal==="Online"){
      this.btnVal = "Offline";
      this.btnCall = "activeButtonOffline"
      this.driverService.driverOffline(this.storageService.getUser().id).subscribe(() => {
        console.log("OFFLINE");
      });
    }else{
      this.btnVal = "Online"
      this.btnCall = "activeButtonOnline"
      this.driverService.driverOnline(this.storageService.getUser().id).subscribe(() => {
        console.log("OFFLINE");
      });
    }
  }

  logout(): void {
    console.log("111111111111111");
    console.log(this.storageService.getUser().id);
    if(this.isDriver){
      this.driverService.driverOffline(this.storageService.getUser().id).subscribe(() => {

        console.log("DASDASDSADASDADS");
      });
    }
    this.storageService.clean();
    this.router.navigate(['']);
  }
}

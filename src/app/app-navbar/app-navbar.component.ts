import {Component, EventEmitter, Output, TemplateRef, ViewChild} from '@angular/core';

import { AuthService } from '../service/auth/auth.service';
import { StorageService } from '../service/storage/storage.service';
import {Router} from '@angular/router';
import { map } from 'leaflet';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent {
  btnVal = "Offline";
  btnCall="activeButtonOffline";
  isLoggedIn = false;
  isNotLoggedIn = true;
  isDriver=false;

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) { }


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
      }
  }
  }

  changeActivity()
  {
    if(this.btnVal==="Online"){
      this.btnVal = "Offline";
      this.btnCall = "activeButtonOffline"
    }else{
      this.btnVal = "Online"
      this.btnCall = "activeButtonOnline"
    }
  }

  logout(): void {
    this.storageService.clean();
    this.router.navigate(['']);
  }
}

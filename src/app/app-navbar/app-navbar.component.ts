import { Component } from '@angular/core';

import { AuthService } from '../service/auth/auth.service';
import { StorageService } from '../service/storage/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent {
  btnVal = "Offline";
  btnCall="activeButtonOffline";

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) { }


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
    this.router.navigate(['/home']);
  }
}

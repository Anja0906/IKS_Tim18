import { Component } from '@angular/core';

@Component({
  selector: 'app-driver-navbar',
  templateUrl: './driver-navbar.component.html',
  styleUrls: ['./driver-navbar.component.css']
})
export class DriverNavbarComponent {
  btnVal = "Offline";
  btnCall="activeButtonOffline";

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
}

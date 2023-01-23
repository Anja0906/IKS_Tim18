import {Component, EventEmitter, Output, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-driver-navbar',
  templateUrl: './driver-navbar.component.html',
  styleUrls: ['./driver-navbar.component.css']
})
export class DriverNavbarComponent {
  btnVal = "Offline";
  btnCall="activeButtonOffline";
  @ViewChild('driver') home!: TemplateRef<any>;
  @Output() templateChange = new EventEmitter<TemplateRef<any>>();
  constructor(private router: Router) {
  }

  homePage() {
    this.router.navigate(['driver']);
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
}

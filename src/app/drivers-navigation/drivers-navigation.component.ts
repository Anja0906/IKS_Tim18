import {Component, EventEmitter, Output, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "../service/storage/storage.service";

@Component({
  selector: 'app-drivers-navigation',
  templateUrl: './drivers-navigation.component.html',
  styleUrls: ['./drivers-navigation.component.css']
})
export class DriversNavigationComponent {

  @ViewChild('currentRide') currentRide!: TemplateRef<any>;
  @ViewChild('profileInfos') profileInfos!: TemplateRef<any>;
  @ViewChild('rideHistory') rideHistory!: TemplateRef<any>;
  @ViewChild('charts') charts!: TemplateRef<any>;
  @Output() templateChange = new EventEmitter<TemplateRef<any>>();
  constructor(private router: Router, private storageService:StorageService) {
  }

  current() {
    this.router.navigate(['driver/about-ride']);
  }
  myAccount(){
    this.router.navigate(['driver/my-account']);
  }
  history(){
    this.router.navigate(['driver/ride-history', this.storageService.getUser().id]);
  }
  stats(){
    this.router.navigate(['driver/stats']);
  }
}

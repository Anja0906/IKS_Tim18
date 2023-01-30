import {Component, EventEmitter, Output, TemplateRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "../service/storage/storage.service";

@Component({
  selector: 'app-passenger-navigation',
  templateUrl: './passenger-navigation.component.html',
  styleUrls: ['./passenger-navigation.component.css']
})
export class PassengerNavigationComponent {
  @ViewChild('currentRide') currentRide!: TemplateRef<any>;
  @ViewChild('profileInfos') profileInfos!: TemplateRef<any>;
  @ViewChild('rideHistory') rideHistory!: TemplateRef<any>;
  @ViewChild('charts') charts!: TemplateRef<any>;
  @Output() templateChange = new EventEmitter<TemplateRef<any>>();
  constructor(private router: Router, private storageService:StorageService) {
  }

  current() {
    this.router.navigate(['passenger/about-ride']);
  }
  myAccount(){
    this.router.navigate(['passenger/my-account']);
  }
  history(){
    this.router.navigate(['passenger/ride-history', this.storageService.getUser().id]);
  }
  stats(){
    this.router.navigate(['passenger/stats', this.storageService.getUser().id]);
  }
  order_ride(){
    this.router.navigate(['/passenger/order-ride']);
  }
}

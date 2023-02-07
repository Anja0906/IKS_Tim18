import {
  Component, ElementRef,
  EventEmitter,
  Output,
  TemplateRef, ViewChild
} from '@angular/core';

import {Router} from "@angular/router";

@Component({
  selector: 'app-admins-navigation',
  templateUrl: './admins-navigation.component.html',
  styleUrls: ['./admins-navigation.component.css']
})
export class AdminsNavigationComponent {
  @ViewChild('newDriver') newDriver!: ElementRef;
  @ViewChild('aboutDrivers') aboutDrivers!: ElementRef;
  @ViewChild('charts') charts!: ElementRef;
  @ViewChild('profileInfos') profileInfos!: ElementRef;
  @ViewChild('usersBlocking') usersBlocking!: ElementRef;
  @ViewChild('panic') panicNotifications!: ElementRef;
  @ViewChild('request') driverSChanges!: ElementRef;
  @ViewChild('rideHistory') rideHistory!: ElementRef;
  @Output() templateChange = new EventEmitter<ElementRef>();
  constructor(private router: Router) {
  }

  addDriver() {
    this.router.navigate(['admin/register-driver']);
  }

  allDrivers(){
    this.router.navigate(['admin/all-drivers']);
  }
  stats(){
    this.router.navigate(['admin/stats/0']);
  }
  myAccount(){
    this.router.navigate(['admin/my-account']);
  }
  blockUsers(){
    this.router.navigate(['admin/block-users']);
  }
  panics(){
    this.router.navigate(['admin/panic-notifications']);
  }

  requests() {
    this.router.navigate(['admin/requests']);
  }

  history() {
    this.router.navigate(['admin/users-history']);
  }
}

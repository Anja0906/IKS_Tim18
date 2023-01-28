import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Output,
  QueryList,
  TemplateRef, ViewChild,
  ViewChildren
} from '@angular/core';
import {AdminPageComponent} from "../admin-page/admin-page.component";
import {RegisterDriverComponent} from "../register-driver/register-driver.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admins-navigation',
  templateUrl: './admins-navigation.component.html',
  styleUrls: ['./admins-navigation.component.css']
})
export class AdminsNavigationComponent {
  @ViewChild('newDriver') newDriver!: TemplateRef<any>;
  @ViewChild('aboutDrivers') aboutDrivers!: TemplateRef<any>;
  @ViewChild('charts') charts!: TemplateRef<any>;
  @ViewChild('profileInfos') profileInfos!: TemplateRef<any>;
  @ViewChild('usersBlocking') usersBlocking!: TemplateRef<any>;
  @ViewChild('panic') panicNotifications!: TemplateRef<any>;
  @ViewChild('request') driverSChanges!: TemplateRef<any>;
  @ViewChild('rideHistory') rideHistory!: TemplateRef<any>;
  @Output() templateChange = new EventEmitter<TemplateRef<any>>();
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

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
  @Output() templateChange = new EventEmitter<TemplateRef<any>>();

  addDriver() {
    this.templateChange.emit(this.newDriver);
  }
  allDrivers(){
    this.templateChange.emit(this.aboutDrivers);
  }
  stats(){
    this.templateChange.emit(this.charts);
  }
  myAccount(){
    this.templateChange.emit(this.profileInfos);
  }
  blockUsers(){
    this.templateChange.emit(this.usersBlocking);
  }
  panics(){
    this.templateChange.emit(this.panicNotifications);
  }
}

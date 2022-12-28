import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { LoginSecondWindowComponent } from 'src/app/login-second-window/login-second-window.component';
import {AdminPageComponent} from "../app/admin-page/admin-page.component";
import {RegisterDriverComponent} from "../app/register-driver/register-driver.component";
import {AboutDrversComponent} from "../app/about-drvers/about-drvers.component";
import {ReportsComponent} from "../app/reports/reports.component";
import {MyProfileInfoComponent} from "../app/my-profile-info/my-profile-info.component";
import {BlockedUsersComponent} from "../app/blocked-users/blocked-users.component";
import {PanicsComponent} from "../app/panics/panics.component";
import {AppMapComponent} from "../app/app-map/app-map.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: LoginComponent},
  { path: 'login/change_password', component: LoginSecondWindowComponent},
  { path: 'login', component: LoginComponent},
  { path:'admin', component: AdminPageComponent},
  { path:'new-driver', component: RegisterDriverComponent},
  { path:'drivers', component: AboutDrversComponent},
  { path:'reports', component: ReportsComponent, outlet: 'adminOutlet'},
  { path:'my-profile', component: MyProfileInfoComponent, outlet: 'adminOutlet'},
  { path:'users-blocking', component: BlockedUsersComponent, outlet: 'adminOutlet'},
  { path:'panics', component: PanicsComponent, outlet: 'adminOutlet'},
  { path:'', component: AppMapComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

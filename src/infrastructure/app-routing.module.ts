import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { AppComponent } from 'src/app/app.component';
import { LoginSecondWindowComponent } from 'src/app/login-second-window/login-second-window.component';
import {AdminPageComponent} from "../app/admin-page/admin-page.component";
import {RegisterDriverComponent} from "../app/register-driver/register-driver.component";
import {AboutDrversComponent} from "../app/about-drvers/about-drvers.component";
import {ReportsComponent} from "../app/reports/reports.component";
import {MyProfileInfoComponent} from "../app/my-profile-info/my-profile-info.component";
import {BlockedUsersComponent} from "../app/blocked-users/blocked-users.component";
import {PanicsComponent} from "../app/panics/panics.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: LoginComponent},
  { path: 'login/change_password', component: LoginSecondWindowComponent},
  { path: 'login', component: LoginComponent},
  { path:'register-driver', component: RegisterDriverComponent},
  { path:'all-drivers', component: AboutDrversComponent},
  { path:'stats', component: ReportsComponent},
  { path:'my-account', component: MyProfileInfoComponent},
  { path:'block-users', component: BlockedUsersComponent},
  { path:'panic-notifications', component: PanicsComponent},
  { path:'**', component: AdminPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

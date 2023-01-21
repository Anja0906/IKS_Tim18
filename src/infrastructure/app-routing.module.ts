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
import {AppModule} from "../app/app.module";
import {AppMapComponent} from "../app/app-map/app-map.component";
import {DriverPageComponent} from "../app/driver-page/driver-page.component";
import {AboutRideComponent} from "../app/about-ride/about-ride.component";
import {PendingRidesComponent} from "../app/pending-rides/pending-rides.component";
import {RideHistoryComponent} from "../app/ride-history/ride-history.component";

import {RegistrationComponent} from 'src/app/registration/registration.component';
import {AboutDriverComponent} from "../app/about-driver/about-driver.component";

const routes: Routes = [

  { path: 'home', component: AppMapComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'login/change_password', component: LoginSecondWindowComponent},
  { path: 'login', component: LoginComponent},
  { path: 'driver',
    component: DriverPageComponent,
    children:[
      { path:'', component: AppMapComponent},
      { path:'about-ride', component: AboutRideComponent},
      { path:'pending-rides', component: PendingRidesComponent},
      { path:'ride-history',component: RideHistoryComponent},
      { path:'my-account', component: MyProfileInfoComponent},
    ],
  },
  { path:'admin',
    component: AdminPageComponent,
    children: [
      { path:'register-driver', component: RegisterDriverComponent},
      { path:'all-drivers', component: AboutDrversComponent},
      { path:'stats', component: ReportsComponent},
      { path:'my-account', component: MyProfileInfoComponent},
      { path:'block-users', component: BlockedUsersComponent},
      { path:'panic-notifications', component: PanicsComponent},
      { path: 'about-driver/:id', component: AboutDriverComponent},
    ],
  },
  { path:'', component: AppMapComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

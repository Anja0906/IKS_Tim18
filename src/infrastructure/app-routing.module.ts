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
import {DriverPageComponent} from "../app/driver-page/driver-page.component";
import {PendingRidesComponent} from "../app/pending-rides/pending-rides.component";
import {RideHistoryComponent} from "../app/ride-history/ride-history.component";
import {RegistrationComponent} from 'src/app/registration/registration.component';
import {AboutDriverComponent} from "../app/about-driver/about-driver.component";
import {DriverActiveRideComponent} from "../app/driver-active-ride/driver-active-ride.component";
import {AboutUsComponent} from "../app/about-us/about-us.component";
import {RequestsComponent} from "../app/requests/requests.component";
import {UsersRideHistoryComponent} from "../app/users-ride-history/users-ride-history.component";
import { PassengerPageComponent } from 'src/app/passenger-page/passenger-page.component';
import { OrderRideComponent } from 'src/app/order-ride/order-ride.component';
import { CurrentRideTimerComponent } from 'src/app/current-ride-timer/current-ride-timer.component';


const routes: Routes = [

  { path: 'home', component: AppMapComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'login/change_password', component: LoginSecondWindowComponent},
  { path: 'login', component: LoginComponent},
  { path: 'driver',
    component: DriverPageComponent,
    children:[
      { path:'', component: AboutUsComponent},
      { path:'about-ride', component: DriverActiveRideComponent},
      { path:'pending-rides', component: PendingRidesComponent},
      { path:'ride-history/:id',component: RideHistoryComponent},
      { path:'my-account', component: MyProfileInfoComponent},
      { path:'stats/:id', component: ReportsComponent},
    ],
  },
  { path:'admin',
    component: AdminPageComponent,
    children: [
      { path:'register-driver', component: RegisterDriverComponent},
      { path:'all-drivers', component: AboutDrversComponent},
      { path:'stats/:id', component: ReportsComponent},
      { path:'my-account', component: MyProfileInfoComponent},
      { path:'block-users', component: BlockedUsersComponent},
      { path:'panic-notifications', component: PanicsComponent},
      { path: 'about-driver/:id', component: AboutDriverComponent},
      { path: 'about-driver/:id', component: AppMapComponent},
      { path: 'requests', component: RequestsComponent},
      { path:'users-history',component: UsersRideHistoryComponent},
      { path:'ride-history/:id',component: RideHistoryComponent},
    ],
  },
  { path: 'passenger',
    component: PassengerPageComponent,
    children:[
      { path:'', component: AboutUsComponent},
      { path:'about-ride', component: DriverActiveRideComponent},
      { path:'pending-rides', component: PendingRidesComponent},
      { path:'ride-history/:id',component: RideHistoryComponent},
      { path:'my-account', component: MyProfileInfoComponent},
      { path:'stats/:id', component: ReportsComponent},
      { path:'order-ride', component: OrderRideComponent},
    ],
  },
  { path:'', component: AppMapComponent},
  { path:'timer/:id', component: CurrentRideTimerComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

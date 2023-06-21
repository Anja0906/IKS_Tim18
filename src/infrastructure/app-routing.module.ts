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
import {PanicNotificationsComponent} from "../app/panics/panic-notifications/panic-notifications.component";
import {RideNotificationComponent} from "../app/pending-rides/ride-notification/ride-notification/ride-notification.component";
import { ReviewsComponent } from 'src/app/reviews/reviews/reviews.component';
import { RateDriverComponent } from 'src/app/reviews/rate-driver/rate-driver/rate-driver.component';
import { RateVehicleComponent } from 'src/app/reviews/rate-vehicle/rate-vehicle/rate-vehicle.component';
import { FavoriteRoutesComponent } from 'src/app/favorite-routes/favorite-routes/favorite-routes.component';
import { AddFavoriteRouteComponent } from 'src/app/favorite-routes/add-favorite-route/add-favorite-route/add-favorite-route.component';
import { RideNotificationsComponent } from 'src/app/passenger-page/ride-notifications/ride-notifications.component';



const routes: Routes = [

  { path: 'home', component: AppMapComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'login/change_password', component: LoginSecondWindowComponent},
  { path: 'login', component: LoginComponent},
  { path: 'driver',
    component: DriverPageComponent,
    children:[
      // { path:'', component: AboutUsComponent},
      { path:'about-ride', component: DriverActiveRideComponent},
      { path:'pending-rides', component: PendingRidesComponent},
      { path:'ride-history/:id',component: RideHistoryComponent},
      { path:'my-account', component: MyProfileInfoComponent},
      { path:'stats/:id', component: ReportsComponent},
      { path:'',component: RideNotificationsComponent},
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
      { path:'',component: PanicNotificationsComponent},
      { path:'reviews/:id',component: ReviewsComponent},
    ],
  },
  { path: 'passenger',
    component: PassengerPageComponent,
    children:[
      { path:'about-ride', component: DriverActiveRideComponent},
      { path:'pending-rides', component: PendingRidesComponent},
      { path:'ride-history/:id',component: RideHistoryComponent},
      { path:'my-account', component: MyProfileInfoComponent},
      { path:'stats/:id', component: ReportsComponent},
      { path:'order-ride', component: OrderRideComponent},
      { path:'order-ride/:id', component: OrderRideComponent},
      { path:'timer/:id', component: CurrentRideTimerComponent},
      { path: 'rate-driver', component: RateDriverComponent},
      { path: 'rate-vehicle', component: RateVehicleComponent},
      { path:'reviews/:id',component: ReviewsComponent},
      { path:'',component: RideNotificationsComponent},
      { path:'favorite-routes',component: FavoriteRoutesComponent},
      { path:'add-fav-route',component: AddFavoriteRouteComponent},
    ],
  },
  { path:'', component: AppMapComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

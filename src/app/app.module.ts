import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppMapComponent } from './app-map/app-map.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { RegisterDriverComponent } from './register-driver/register-driver.component';
import { BlockedUsersComponent } from './blocked-users/blocked-users.component';
import { AboutDrversComponent } from './about-drvers/about-drvers.component';
import { ReportsComponent } from './reports/reports.component';
import { MyProfileInfoComponent } from './my-profile-info/my-profile-info.component';
import { PanicsComponent } from './panics/panics.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminsNavigationComponent } from "./admins-navigation/admins-navigation.component";
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from 'src/infrastructure/app-routing.module';
import { LoginSecondWindowComponent } from './login-second-window/login-second-window.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import { DriverPageComponent } from './driver-page/driver-page.component';
import { AboutRideComponent } from './about-ride/about-ride.component';
import { PendingRidesComponent } from './pending-rides/pending-rides.component';
import { RideHistoryComponent } from './ride-history/ride-history.component';
import { DriverNavbarComponent } from './driver-navbar/driver-navbar.component';
import { ReasonDialogComponent } from './panics/reason-dialog/reason-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatLegacyButtonModule} from "@angular/material/legacy-button";
import { NoteComponent } from './blocked-users/note/note.component';
import {MessageComponent} from './blocked-users/messages/messages/messages.component';
import { httpInterceptorProviders } from './interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import { AboutDriverComponent } from './about-driver/about-driver.component';
import {CommonModule} from "@angular/common";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import { DriversNavigationComponent } from './drivers-navigation/drivers-navigation.component';
import { MapDriverComponent } from './map-driver/map-driver.component';
import { DriverActiveRideComponent } from './driver-active-ride/driver-active-ride.component';
import { RejectionComponent } from './about-ride/reject/rejection/rejection.component';
import { PanicDriveComponent } from './about-ride/panic/panic-drive/panic-drive.component';
import { RequestsComponent } from './requests/requests.component';
import { UsersRideHistoryComponent } from './users-ride-history/users-ride-history.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { PassengerPageComponent } from './passenger-page/passenger-page.component';
import { PassengerNavigationComponent } from './passenger-navigation/passenger-navigation.component';
import { OrderRideComponent } from './order-ride/order-ride.component';
import { CurrentRideTimerComponent } from './current-ride-timer/current-ride-timer.component';


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppMapComponent,
    AppFooterComponent,
    AdminPageComponent,
    RegisterDriverComponent,
    BlockedUsersComponent,
    AboutDrversComponent,
    ReportsComponent,
    MyProfileInfoComponent,
    PanicsComponent,
    AboutUsComponent,
    AdminsNavigationComponent,
    RegistrationComponent,
    LoginComponent,
    LoginSecondWindowComponent,
    DriverPageComponent,
    AboutRideComponent,
    PendingRidesComponent,
    RideHistoryComponent,
    DriverNavbarComponent,
    ReasonDialogComponent,
    NoteComponent,
    MessageComponent,
    AboutDriverComponent,
    DriversNavigationComponent,
    MapDriverComponent,
    DriverActiveRideComponent,
    RejectionComponent,
    PanicDriveComponent,
    RequestsComponent,
    UsersRideHistoryComponent,
    PassengerPageComponent,
    PassengerNavigationComponent,
    OrderRideComponent,
    CurrentRideTimerComponent
  ],
  entryComponents: [ReasonDialogComponent, NoteComponent, MessageComponent],
    imports: [
        MatDialogModule,
        BrowserModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatLegacyButtonModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        MatTableModule,
        Ng2SearchPipeModule,
        MatDatepickerModule,
        MatNativeDateModule,
        // DriverNavbarComponent,

    ],
  exports:[AppMapComponent],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

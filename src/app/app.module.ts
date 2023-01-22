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
import { DriversNavigationComponent } from './drivers-navigation/drivers-navigation.component';
import { MapDriverComponent } from './map-driver/map-driver.component';
import { DriverActiveRideComponent } from './driver-active-ride/driver-active-ride.component';


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
    DriversNavigationComponent,
    MapDriverComponent,
    DriverActiveRideComponent
  ],
  entryComponents: [ReasonDialogComponent, NoteComponent, MessageComponent],
  imports: [
    MatDialogModule,
    BrowserModule,
    ReactiveFormsModule,

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
    // DriverNavbarComponent,

  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppMapComponent } from './app-map/app-map.component';
import { AppCardHolderComponent } from './app-card-holder/app-card-holder.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { RegisterDriverComponent } from './register-driver/register-driver.component';
import { BlockedUsersComponent } from './blocked-users/blocked-users.component';
import { AboutDrversComponent } from './about-drvers/about-drvers.component';
import { ReportsComponent } from './reports/reports.component';
import { MyProfileInfoComponent } from './my-profile-info/my-profile-info.component';
import { PanicsComponent } from './panics/panics.component';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppMapComponent,
    AppCardHolderComponent,
    AppFooterComponent,
    AdminPageComponent,
    RegisterDriverComponent,
    BlockedUsersComponent,
    AboutDrversComponent,
    ReportsComponent,
    MyProfileInfoComponent,
    PanicsComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



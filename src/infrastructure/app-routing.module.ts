import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { AppComponent } from 'src/app/app.component';
import { LoginSecondWindowComponent } from 'src/app/login-second-window/login-second-window.component';
import {AdminPageComponent} from "../app/admin-page/admin-page.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: LoginComponent},
  { path: 'login/change_password', component: LoginSecondWindowComponent},
  { path: 'admin', component: AdminPageComponent},
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

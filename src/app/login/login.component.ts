import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  display = false;
  onPress() {
    this.display = true;
  }

   /*if you want the component to show and hide on click pressed, use 
   use this line
   this.display = !this.display;*/
 }

import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Login } from './pages/login/login';
import { Alarm } from './pages/alarm/alarm';

import { AuthService } from './services/auth.service';



@Component({

selector:'app-root',

templateUrl:'./app.html',

styleUrl:'./app.css',

imports:[
  Login,
  Alarm,
  AsyncPipe
]

})
export class App {


constructor(
 private auth:AuthService
){}



get loggedIn(){

 return this.auth.isLoggedIn();

}



logout(){

 this.auth.logout();

 window.location.reload();

}

}
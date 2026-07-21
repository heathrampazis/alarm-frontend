import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector:'app-login',
  templateUrl:'./login.html',
  imports:[
    FormsModule
  ]
})
export class Login {
  username = '';
  password = '';

  constructor(private auth:AuthService){}

  login(){
    this.auth.login(this.username, this.password).subscribe({
      next:(response)=>{
        console.log("Logged in", response);
        this.auth.saveToken(response.token);
        window.location.reload();
      },
      error:(err)=>{
        console.error("Login failed", err);
      }
    });
  }

  register(){
    this.auth.register(this.username, this.password).subscribe({
      next:(response)=>{
        console.log("Registered", response);
      },
      error:(err)=>{
        console.error("Register failed", err);
      }
    });
  }
  
}
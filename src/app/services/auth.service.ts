import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private api = "http://localhost:8080/api/auth";
  private api = "/api/auth";

  constructor(private http: HttpClient){}

  login(username:string, password:string) {
    return this.http.post<any>(
      `${this.api}/login`,
      {
        username,
        password
      }
    );
  }

  register(username:string, password:string) {
    return this.http.post<any>(
      `${this.api}/register`,
      {
        username,
        password
      }
    );
  }

  saveToken(token:string) {
    localStorage.setItem("token", token);
  }

  logout(){
    localStorage.removeItem("token");
  }

  isLoggedIn(){
    return !!localStorage.getItem("token");
  }

}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenthicated = false;

  constructor() { }

  public login(username: string, password : string) : boolean {
    if (username == 'joel' && password == 'password') {
      this.isAuthenthicated = true;
      return true;
    }
    return false;
  }

  public logOut() {
    this.isAuthenthicated = false;
  }

  public isLoggedIn() {
    return this.isAuthenthicated;
  }
}

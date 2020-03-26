import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  checkLogin(url?: string): object {
    // check if there is a token present already, only then allow else not
    if (window.localStorage.getItem('auth')) {
      return {
        ok: true,
        auth: window.localStorage.getItem('auth'),
        redirectTo: url,
      };
    }
    return {
      ok: false,
      redirectTo: '/login',
    };
  }

  loginUser(username, password) {
    const loggedInUser = {username, password};
    window.localStorage.setItem('user', JSON.stringify(loggedInUser));
    window.localStorage.setItem('auth', 'dummy auth');
    return true;
  }

  logoutUser(username?: string) {
    window.localStorage.removeItem('auth');
    window.localStorage.removeItem('user');
    return true;
  }

  getLogginUser() {
    return window.localStorage.getItem('user');
  }
}

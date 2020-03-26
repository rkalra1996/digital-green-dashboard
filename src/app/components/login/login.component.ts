import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authSrvc: AuthService) { }

  ngOnInit(): void {
    // if the user intentionally visits login, simply clean the current logged in user
    this.cleanLogin();
  }

  loginUser() {
    if (this.authSrvc.loginUser('admin', 'password')) {
      let redirectTo = this.route.snapshot.queryParams['redirectTo'];
      console.log('recieved redirect url as ', redirectTo);
      if (!redirectTo) {
        redirectTo = '/dashboard';
      }
      // redirect user to respective page
      this.router.navigateByUrl(redirectTo);
    }
  }

  cleanLogin() {
    this.authSrvc.logoutUser('admin');
  }

}

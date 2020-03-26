import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authSrvc: AuthService) { }

  ngOnInit(): void {
    // if the user intentionally visits login, simply clean the current logged in user
    this.cleanLogin();
  }

  loginUser(username, password) {
    if (this.authSrvc.loginUser(username, password)) {
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

  submitForm() {
    if (this.form.valid) {
      const valiadtion = this.validateAdmin(this.form.value);
      if (valiadtion) {
        this.loginUser(this.form.value.username, this.form.value.password);
      }
    } else {
      this.error = 'Fill the form to login';
    }
  }

  validateAdmin(userObject) {
    if (userObject.username !== 'admin') {
      this.error = 'Username is not valid';
      return false;
    } else if (userObject.password !== 'admin') {
      this.error = 'Password is not valid';
      return false;
    } else {
      return true;
    }
  }

}

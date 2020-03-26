import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  toolbarTiles = [];
  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
    // set toolbar tiles to be sent to the toolbar component
    this.toolbarTiles = this.getToolbarDetails();
  }

  getToolbarDetails() {
    const loggedIn = this.authService.checkLogin();
    const toolbarObject = [{
      name: 'Home',
      route: '/dashboard',
    }];
    if (!loggedIn['ok']) {
      toolbarObject.push({
        name: 'Login',
        route: '/login'
      });
    }
    return toolbarObject;
  }

}

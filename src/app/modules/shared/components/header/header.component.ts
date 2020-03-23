import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  toolbarTiles = [];
  constructor() { }

  ngOnInit(): void {
    // set toolbar tiles to be sent to the toolbar component
    this.toolbarTiles = this.getToolbarDetails();
  }

  getToolbarDetails() {
    return [
      {
        name: 'Home',
        route: '/dashboard',
      },
      {
        name: 'Login',
        route: '/login'
      }
    ];
  }

}

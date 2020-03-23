import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-dashboard-toolbar',
  templateUrl: './dashboard-toolbar.component.html',
  styleUrls: ['./dashboard-toolbar.component.scss']
})
export class DashboardToolbarComponent implements OnInit {

  @Input() toolbarTiles: object[] | null;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  buttonClick(tileClicked) {
    console.log('clicked', tileClicked);
    if (tileClicked.hasOwnProperty('route') && typeof tileClicked.route === 'string' && tileClicked.route.includes('/')) {
      this.router.navigate([tileClicked.route]);
    } else {
      console.error('will not route on button click, either the button did not recieve a route key, or the route key is not of type string, or the key does not have a backslash')
    }
  }

}

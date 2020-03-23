import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-filter-toolbar',
  templateUrl: './filter-toolbar.component.html',
  styleUrls: ['./filter-toolbar.component.scss']
})
export class FilterToolbarComponent implements OnInit {

  fromPickerText = 'Choose from date';
  toPickerText = 'Choose to date';

  constructor() { }

  ngOnInit(): void {
  }

  selectedToDateEvent($event) {
    console.log('recieved date as ', $event);
  }

}

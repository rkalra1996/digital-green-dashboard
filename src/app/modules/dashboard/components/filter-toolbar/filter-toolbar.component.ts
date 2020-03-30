import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DashboardCoreService } from '../../services/dashboard-core/dashboard-core.service';
import { Subscription } from 'rxjs';
import { DashboardFilterUtilityService } from '../../services/dashboard-filter-utility/dashboard-filter-utility.service';

@Component({
  selector: 'dashboard-filter-toolbar',
  templateUrl: './filter-toolbar.component.html',
  styleUrls: ['./filter-toolbar.component.scss']
})
export class FilterToolbarComponent implements OnInit {

  dataSubs: Subscription;
  fromPickerText = 'Choose from date';
  toPickerText = 'Choose to date';
  defaultStartingDate = '03/01/2020';
  dateForm = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
  });

  @Output() filteredData = new EventEmitter<object|null>();

  constructor(
    private readonly filterUtilitySrvc: DashboardFilterUtilityService,
    private readonly dashboardCore: DashboardCoreService) { }

  ngOnInit(): void {
    this.dateForm.setValue({
      from: this.filterUtilitySrvc.parseDate(this.defaultStartingDate),
      // setting to date to the current date initially
      to: this.filterUtilitySrvc.parseDate(null, true),
    });
    console.log('default date object set as -> ', this.dateForm.value);
    this.submitInitialDataDate(this.dateForm);
  }

  submitInitialDataDate(dateGroup) {
    const initialDataSubs = this.dashboardCore.getDashboardData(dateGroup.value).subscribe(response => {
      console.log('recieved initial data response as ', response);
      this.filteredData.emit(response.data);
    }, error => {
      console.log('An error occured while hitting the retrieve api', error);
      window.alert('Error loading the report, try again later');
      initialDataSubs.unsubscribe();
    });
  }

  selectedToDateEvent($event) {
    this.dateForm.patchValue({to: new Date($event).toLocaleDateString()});
  }

  selectedFromDateEvent($event) {
    this.dateForm.patchValue({from: new Date($event).toLocaleDateString()});
  }

  submitForm() {
    this.dataSubs = this.dashboardCore.getDashboardData(this.dateForm.value)
    .subscribe(response => {
      if (response && response.hasOwnProperty('ok') && response.ok && response.hasOwnProperty('data')) {
        this.filteredData.emit(response.data);
        this.dataSubs.unsubscribe();
      }
    }, err => {
      console.log('An error occured while getting the data from the server');
      console.log(err);
      this.dataSubs.unsubscribe();
    });
  }

}

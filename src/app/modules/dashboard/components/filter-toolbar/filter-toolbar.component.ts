import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DashboardCoreService } from '../../services/dashboard-core/dashboard-core.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dashboard-filter-toolbar',
  templateUrl: './filter-toolbar.component.html',
  styleUrls: ['./filter-toolbar.component.scss']
})
export class FilterToolbarComponent implements OnInit, OnDestroy {

  dataSubs: Subscription;
  fromPickerText = 'Choose from date';
  toPickerText = 'Choose to date';
  dateForm = new FormGroup({
    from: new FormControl(''),
    to: new FormControl(''),
  });

  constructor(private readonly dashboardCore: DashboardCoreService) { }

  ngOnInit(): void {
    this.dateForm.setValue({
      from: new Date('03/01/2020').toLocaleDateString(),
      to: new Date().toLocaleDateString()
    });
    console.log(this.dateForm.get('from').value)
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
      console.log('recieved response as ', response);
      this.dataSubs.unsubscribe();
    }, err => {
      console.log('An error occured while getting the data from the server');
      console.log(err);
      this.dataSubs.unsubscribe();
    });
  }

  ngOnDestroy() {
  }

}

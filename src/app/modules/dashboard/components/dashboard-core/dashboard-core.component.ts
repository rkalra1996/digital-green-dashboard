import { Component, OnInit } from '@angular/core';
import { DashboardUtilityService } from '../../services/dashboard-utility/dashboard-utility.service';

@Component({
  selector: 'app-dashboard-core',
  templateUrl: './dashboard-core.component.html',
  styleUrls: ['./dashboard-core.component.scss']
})
export class DashboardCoreComponent implements OnInit {

  tableDetails: object;

  constructor(private readonly dashboardUSrvc: DashboardUtilityService) { }

  ngOnInit(): void {
  }

  processFilteredData(data) {
    this.tableDetails = {...this.dashboardUSrvc.processDataForTable(data)};
    debugger;
    console.log('assigning new data in parent as ', this.tableDetails);
  }

}

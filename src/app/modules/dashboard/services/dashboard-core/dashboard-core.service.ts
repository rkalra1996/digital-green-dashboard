import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DashboardUtilityService } from '../dashboard-utility/dashboard-utility.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardCoreService {

  constructor(private readonly dashboardUSrvc: DashboardUtilityService) { }

  getDashboardData(dateFilters) {
    console.log('recieved filters as ', dateFilters);
    const request = this.dashboardUSrvc.generateReportRequestObject(dateFilters);
    return this.dashboardUSrvc.hitReportAPI(request);
  }
}

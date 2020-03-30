import { Injectable } from '@angular/core';
import { DashboardUtilityService } from '../dashboard-utility/dashboard-utility.service';
import { DownloadService } from 'src/app/modules/shared/services/download-service/download.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardCoreService {

  constructor(
    private readonly dashboardUSrvc: DashboardUtilityService,
    private readonly fileDownloaderSrvc: DownloadService,
    ) { }

  getDashboardData(dateFilters) {
    console.log('recieved filters as ', dateFilters);
    const request = this.dashboardUSrvc.generateReportRequestObject(dateFilters);
    if (request['ok']) {
      return this.dashboardUSrvc.hitReportAPI(request);
    } else {
      if (request.hasOwnProperty('error')) {
        throw new Error(request.error);
      } else {
        throw new Error('Error occured while generating date values from supplied date')
      }
    }
  }

  downloadDataAsCSV(data, columns, filename= '') {
    if (!filename) {
      filename = `session_details_${new Date().toLocaleDateString()}`;
    }
    console.log('filename is ', filename);
    this.fileDownloaderSrvc.downloadAsCSV(data, columns, filename);
  }

  parseDataForExport(dataArray, columns) {
    const parsedDataArray = dataArray.map(dataObj => {
      const newObj = {...dataObj};
      if (newObj.hasOwnProperty('Hindi Text') && newObj['Hindi Text']) {
        newObj['Hindi Text'] = `"${newObj['Hindi Text']}"`;
      }
      if (newObj.hasOwnProperty('English Text') && newObj['English Text']) {
        newObj['English Text'] = `"${newObj['English Text']}"`;
      }
      if (newObj.hasOwnProperty('key phrases') && newObj['key phrases']) {
        newObj['key phrases'] = `"${newObj['key phrases']}"`;
      }
      if (newObj.hasOwnProperty('Question Text') && newObj['Question Text']) {
        newObj['Question Text'] = `"${newObj['Question Text']}"`;
      }
      delete newObj['No'];
      return newObj;
    });
    // remove the No entry from columns as well
    const newCols = columns.filter(a => a.toLowerCase() !== 'No'.toLowerCase());
    return {data: parsedDataArray, columns: newCols};
  }

}

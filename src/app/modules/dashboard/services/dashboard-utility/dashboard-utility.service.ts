import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/modules/shared/services/config-service/config.service';
import { Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpService } from 'src/app/modules/shared/services/http-service/http.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardUtilityService {

  constructor(
    private readonly configSrvc: ConfigService,
    private readonly httpSrvc: HttpService,
  ) { }

  parseDateForAPI(dateObj) {
    const newObj = {...dateObj};
    if (dateObj.hasOwnProperty('from')) {
      const fromArray = dateObj.from.split('/');
      newObj.from = `${fromArray[1]}/${fromArray[0]}/${fromArray[2]}`;
    }
    if (dateObj.hasOwnProperty('to')) {
      const toArray = dateObj.to.split('/');
      newObj.to = `${toArray[1]}/${toArray[0]}/${toArray[2]}`;
    }
    console.log('parsed date object ', newObj);
    return newObj;
  }

  generateReportRequestObject(dateObj) {
    // add the respective query parameters
    dateObj = this.parseDateForAPI(dateObj);
    const qString = this.createQueryString(dateObj);
    return {
      url: this.configSrvc.getUrl('getReportEndPoint') + qString,
    };
  }

  hitReportAPI(requestObject): Observable<any> {
    return this.httpSrvc.Get(requestObject.url).pipe(map(response => {
      console.log('recieved response as ', response);
      return response['data'];
    }));
  }

  createQueryString(data: object) {
    if (!Object.keys.length) {
      return '';
    }
    return Object.keys(data).reduce((accumulator, currentKey, currentIdx) => {
      return `${accumulator}${currentKey}=${data[currentKey]}${(currentIdx !== Object.keys(data).length - 1) ? '&' : ''}`;
    }, '?');
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardFilterUtilityService {

  constructor() { }

  /**
   * Parses date. The fuction will verify and convert the date string provided into a format 'mm/dd/yyyy'
   * @param dateSring date string
   * @param [setCurrent] Boolean vaue which defaults to false. Setting it true means you wish to parse the current date and not the supplied date
   * @returns  modified date string
   */
  parseDate(dateSring, setCurrent?: boolean) {
    try {
      console.log('date recieved to parse is ', dateSring);
      let dateObj;
      if (setCurrent) {
        console.log('setting the current date to parse ', new Date());
        dateObj = new Date();
      } else {
        dateObj = new Date(dateSring);
      }
      const modifiedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
      console.log('modified date now is ', modifiedDate);
      return modifiedDate;
    } catch (e) {
      window.alert('Error parsing date, try again later');
      console.error('An error occured while parsing date for universal format -> ', e);
      return '';
    }
  }
}

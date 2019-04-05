import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  toString(dateString: string): Date {
    var retVal: Date;
    try {
      retVal = moment(dateString, 'MM/DD/YYYY').toDate();
    }
    catch (ex) {
      console.log(`Unable to format date from string ${dateString} `);
    }
    return retVal;
  }

  formatToString(value: Date, format = 'MM/DD/YYYY'): string {
    var retVal: string;
    try {
      retVal = moment(value).format(format);
    }
    catch (ex) {
      console.log('Unable to format date to string', value);
    }
    return retVal;
  }
}

import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() {
    console.log('recieved environment as ', environment);
   }

   getUrl(key) {
     return this.BaseUrl +  this.getKey('urls')[key];
   }

   getKey(key) {
     return environment[key];
   }

   get BaseUrl() {
     return this.getKey('baseEndPoint');
   }

   get AuthToken() {
     return this.getKey('authToken');
   }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config-service/config.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpClient) { }

  Get(url) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.getAuthToken(),
      }),
    };
    return this.http.get(url, httpOptions);
  }

  getAuthToken() {
    return this.config.AuthToken;
  }
}

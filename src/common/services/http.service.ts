import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public get<T>(url: string, httpHeaders?: HttpHeaders): Observable<T> {
    if (httpHeaders == undefined) {
      return this.http.get<T>(url);
    }
    else {
      return this.http.get<T>(url, { headers: httpHeaders });
    }
  }

  public post(url: string, body: any, httpHeaders?: HttpHeaders) {
    if (httpHeaders == undefined) {
      return this.http.post(url, body);
    }
    else {
      return this.http.post(url, body, { headers: httpHeaders });
    }
  }

}

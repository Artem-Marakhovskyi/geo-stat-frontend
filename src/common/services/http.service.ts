import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T> {
      return this.http.get<T>(url);
  }

  public post(url: string, body: any) {
      return this.http.post(url, body);
  }

}

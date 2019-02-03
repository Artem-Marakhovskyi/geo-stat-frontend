import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public get<T>(url: String): Observable<T> {
    return this.http.get<T>(url.toString());
  }

  public post(url: String, body: any) {
    this.http.post(url.toString(), body);
  }

}

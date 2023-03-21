import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpHeaders,HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  httpHeaders:any;
  httpOptions:any;

  constructor(private http: HttpClient) { }

  getItems(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "");
  }

  login(postData:any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/login",postData);
  }

  resetPassword(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/resetPassword",postData);
  }
  
}

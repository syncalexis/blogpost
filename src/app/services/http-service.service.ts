import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public post(url:any, postData:any): Observable<any> {
    const formData = new FormData();
    if (postData) {
      for (const propt in postData) {
        if (propt) {
          formData.append(propt, postData[propt]);
        }
      }
    }
    let httpOptions = this.getHttpOptions();
    return this.http.post<any>(url, postData, httpOptions).pipe(
      catchError((err) => {
        const { status, error } = err;
        return throwError(err);
      }));
  }

  public put(url:any, postData:any): Observable<any> {
    const formData = new FormData();
    if (postData) {
      for (const propt in postData) {
        if (propt) {
          formData.append(propt, postData[propt]);
        }
      }
    }
    let httpOptions = this.getHttpOptions();
    return this.http.put<any>(url, postData, httpOptions).pipe(
      catchError((err) => {
        const { status } = err;

        return throwError(err);
      }));
  }

  public get(url:any, params = null): Observable<any> {
    let httpOptions = this.getHttpOptions();
    if (params) {
      url += this.createUrlParam(params);
    }
    return this.http.get<any>(url, httpOptions).pipe(
      catchError((err) => {
        const { status } = err;
    
        return throwError(err);
      }));
  }

  public delete(url:any, params = null): Observable<any> {
    let httpOptions = this.getHttpOptions();
   if (params) {
      url += this.createUrlParam(params);
    }
    return this.http.delete<any>(url, httpOptions).pipe(
      catchError((err) => {
        const { status, error } = err;
        return throwError(err);
      }));
  }






  createUrlParam(p:any) {
    let uriStr = "?";
    let counter = 0;
    for (let key of Object.keys(p)) {
        if (counter == 0) {
          uriStr += key + "=" ;
          if (p[key]) {
            uriStr += p[key] ;
          }
        } else {
          uriStr += "&" + key + "=" ;
          if (p[key]) {
            uriStr += p[key] ;
          }
        }
        counter++;
      }
    return uriStr;
  }



  getHttpOptions() {
    let Auth_token = localStorage.getItem('token')
    let httpHeaders = {
      Authorization: Auth_token,
    };
    let httpOptions = {
    };
    return httpOptions;
    
  }
}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private httpClient: HttpClient;
  constructor(private http: HttpClient) { 
    this.httpClient = http;
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }


  post(path: string, body: Object = {}, options: Object = {}): Observable<any> {
    return this.http.post(
      `${path}`,
      body,
      options
    ).pipe(catchError(this.formatErrors));
  }


  getWithHeaders(path: string, httpHeaders: HttpHeaders = new HttpHeaders()): Observable<any> {
    return this.http.get(`${path}`, { headers:httpHeaders,observe: "response" })
      .pipe(catchError(this.formatErrors));
  }

  getWithParams(path: string, httpParams: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${path}`, { params:httpParams })
      .pipe(catchError(this.formatErrors));
  }
}

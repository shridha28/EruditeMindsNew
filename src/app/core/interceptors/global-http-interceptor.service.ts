import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from "rxjs";
import {catchError, map, retry, tap} from 'rxjs/operators';
import {LoaderService} from '../../shared/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalHttpInterceptorService implements HttpInterceptor {
  constructor(private loaderService: LoaderService) { }

intercept(request:HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>>{
       this.showLoader();
      return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.onEnd();
          }
        },
          (err: any) => {
            this.onEnd();
          }),
       retry(1),
         catchError((error: HttpErrorResponse) => {
            let errMsg = '';
            // Client Side Error
            if (error.error instanceof ErrorEvent) {
              errMsg = `Error: ${error.error.message}`;
              console.log('error is intercepted');
            }
            // Server Side Error
            else {
              errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
              console.log('error is intercepted');
            }
            console.log(errMsg);
            return throwError(errMsg);
          })
         
       );
}

  private onEnd(): void {
    this.hideLoader();
  }
  
  private showLoader(): void {
    this.loaderService.show();
  }
  
  private hideLoader(): void {
    this.loaderService.hide();
  }
}

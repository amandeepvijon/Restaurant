import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(private toast:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        async (requestError: any) => {
          if(requestError instanceof HttpErrorResponse && requestError.status == 500) {
            this.toast.error("Internal Server Error");
          }
        }
      )
    )
  }
}

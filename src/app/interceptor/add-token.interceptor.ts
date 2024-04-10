import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const _router = inject(Router)
  const token = localStorage.getItem('token')

  if(token){
    const reqWithHeader = req.clone({
      headers: req.headers.set('authorization', token),
    });

    return next(reqWithHeader).pipe(catchError((error: any)=>{
      if( error instanceof HttpErrorResponse && error.status == 401){
          localStorage.removeItem('token');
          _router.navigate(['login']);

      }
      return throwError(()=> new Error(""))
    }));
  }
  return next(req);
};

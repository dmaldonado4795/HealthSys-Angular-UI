import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getAccessToken();
  let authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  const isRefreshing = inject(BehaviorSubject<boolean>, { optional: true }) || new BehaviorSubject<boolean>(false);
  const refreshTokenSubject = inject(BehaviorSubject<string | null>, { optional: true }) || new BehaviorSubject<string | null>(null);

  return next(authReq).pipe(
    catchError((error) => {
      console.log(error);
      if (error instanceof HttpErrorResponse && error.status === 401) {
        if (!isRefreshing.value) {
          isRefreshing.next(true);
          refreshTokenSubject.next(null);

          return authService.refreshToken().pipe(
            switchMap((res) => {
              isRefreshing.next(false);
              console.log(res.token, res.refreshToken);
              authService.setTokens(res.token, res.refreshToken);
              refreshTokenSubject.next(res.token);
              const clonedRequest = req.clone({ setHeaders: { Authorization: `Bearer ${res.token}` } });
              return next(clonedRequest);
            }),
            catchError((err) => {
              isRefreshing.next(false);
              authService.logout();
              return throwError(() => err);
            })
          );
        } else {
          return refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(token => {
              const clonedRequest = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
              return next(clonedRequest);
            })
          );
        }
      }
      return throwError(() => error);
    })
  );
};

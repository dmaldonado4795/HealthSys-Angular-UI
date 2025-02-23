import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem(environment.sessionUser);
  
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};

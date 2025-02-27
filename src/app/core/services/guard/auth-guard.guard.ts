import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem(environment.sessionUser);

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

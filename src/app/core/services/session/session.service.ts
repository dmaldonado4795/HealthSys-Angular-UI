import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  public getSession(): string | null {
    return sessionStorage.getItem(environment.sessionUser);
  }

  public createSession(token: string): void {
    sessionStorage.setItem(environment.sessionUser, token);
  }

  public deleteSession(): void {
    sessionStorage.removeItem(environment.sessionUser);
  }
}

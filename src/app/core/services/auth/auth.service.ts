import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ACCESS_TOKEN: string = 'ACCESS_TOKEN';
  private REFRESH_TOKEN: string = 'REFRESH_TOKEN';

  private readonly apiUrl = `${environment.url}/auth`;

  constructor(private httpClient: HttpClient) { }

  public getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  public setTokens(token: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN, token);
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  public login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/login`, { username, password });
  }

  public refreshToken(): Observable<any> {
    let refreshToken = localStorage.getItem(this.REFRESH_TOKEN) || null;
    console.log({ refreshToken })
    return this.httpClient.post(`${this.apiUrl}/refresh-token`, { refreshToken });
  }

  public logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN)
  }
}

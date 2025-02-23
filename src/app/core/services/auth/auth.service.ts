import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = `${environment.url}/auth`;

  constructor(private httpClient: HttpClient) { }

  public login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/login`, { username, password });
  }
}

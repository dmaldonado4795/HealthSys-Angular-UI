import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../../models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private readonly apiUrl = `${environment.url}/doctor`;

  constructor(private httpClient: HttpClient) { }

  public getDoctors(): Observable<any> {
    return this.httpClient.get<Doctor[]>(`${this.apiUrl}/find-all`);
  }

  public getDoctorById(id: number): Observable<any> {
    return this.httpClient.get<Doctor>(`${this.apiUrl}/find-by-id/${id}`);
  }

  public saveDoctor(doctor: Doctor): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/save`, doctor);
  }

  public updateDoctor(id: number, doctor: Doctor): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/update/${id}`, doctor);
  }
}

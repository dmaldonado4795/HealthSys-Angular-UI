import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../../models/appointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private readonly apiUrl = `${environment.url}/appointment`;

  constructor(private httpClient: HttpClient) { }

  public getAppointments(): Observable<any> {
    return this.httpClient.get<Appointment[]>(`${this.apiUrl}/find-all`);
  }

  public getAppointment(id: number): Observable<any> {
    return this.httpClient.get<Appointment>(`${this.apiUrl}/find-by-id/${id}`);
  }

  public saveAppointment(appointment: Appointment): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/save`, appointment);
  }

  public updateAppointment(id: number, appointment: Appointment): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/update/${id}`, appointment);
  }
}

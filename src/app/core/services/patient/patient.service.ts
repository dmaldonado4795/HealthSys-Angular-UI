import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../../models/patient';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private readonly apiUrl = `${environment.url}/patient`;

  constructor(private httpClient: HttpClient) { }

  public getPatients(): Observable<any> {
    return this.httpClient.get<Patient[]>(`${this.apiUrl}/find-all`);
  }

  public getPatientById(id: number): Observable<any> {
    return this.httpClient.get<Patient>(`${this.apiUrl}/find-by-id/${id}`);
  }

  public savePatient(patient: Patient): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/save`, patient)
  }

  public updatePatient(id: number, patient: Patient): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/update/${id}`, patient);
  }

}

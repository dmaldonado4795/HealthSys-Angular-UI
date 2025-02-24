import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MedicalHistory } from '../../models/medical-history';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {

  private readonly apiUrl = `${environment.url}/medical-history`;

  constructor(private httpClient: HttpClient) { }

  public getMedicalHistories(): Observable<any> {
    return this.httpClient.get<MedicalHistory[]>(`${this.apiUrl}/find-all`);
  }

  public getMedicalHistory(id: number): Observable<any> {
    return this.httpClient.get<MedicalHistory>(`${this.apiUrl}/find-by-id/${id}`);
  }

  public saveMedicalHistory(medicalHistory: MedicalHistory): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/save`, medicalHistory);
  }

  public updateMedicalHistory(id: number, medicalHistory: MedicalHistory): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/update/${id}`, medicalHistory);
  }
}

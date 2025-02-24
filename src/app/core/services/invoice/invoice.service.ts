import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private readonly apiUrl = `${environment.url}/invoice`;

  constructor(private httpClient: HttpClient) { }

  public getInvoices(): Observable<any> {
    return this.httpClient.get<Invoice[]>(`${this.apiUrl}/find-all`);
  }

  public getInvoice(id: number): Observable<any> {
    return this.httpClient.get<Invoice>(`${this.apiUrl}/find-by-id/${id}`);
  }

  public saveInvoice(invoice: Invoice): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/save`, invoice);
  }

  public updateInvoice(id: number, invoice: Invoice): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/update/${id}`, invoice);
  }
}

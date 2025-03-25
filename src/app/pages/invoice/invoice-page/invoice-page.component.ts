import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Invoice } from '../../../core/models/invoice';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { InvoiceService } from '../../../core/services/invoice/invoice.service';

@Component({
  selector: 'app-invoice-page',
  imports: [
    CommonModule,
    SidebarComponent
  ],
  templateUrl: './invoice-page.component.html',
  styleUrl: './invoice-page.component.css'
})
export class InvoicePageComponent {
  invoices: Invoice[] = [];

  constructor(
    private router: Router,
    private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(): void {
    Swal.fire({
      icon: 'info',
      text: 'Loading...',
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        try {
          const resp: any = await lastValueFrom(this.invoiceService.getInvoices());
          this.invoices = resp.data;
          Swal.close();
        } catch (error: any) {
          const message = error.error.message;
          Swal.fire('Error', message, 'error');
        }
      }
    });
  }

  goToNewInvoice(): void {
    this.router.navigate(['/invoice']);
  }

  goToEditInvoice(id: number): void {
    this.router.navigate(['/invoice', id]);
  }
}

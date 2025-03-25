import { Component } from '@angular/core';
import { Appointment } from '../../../core/models/appointment';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../../core/services/appointment/appointment.service';
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';
import { InvoiceService } from '../../../core/services/invoice/invoice.service';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-form-page',
  imports: [
    SidebarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './invoice-form-page.component.html',
  styleUrl: './invoice-form-page.component.css'
})
export class InvoiceFormPageComponent {
  private id: number = 0;
  appointments: Appointment[] = [];

  form: FormGroup = new FormGroup({
    totalAmount: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    appointment: new FormControl(null, [Validators.required])
  });

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private appointmentService: AppointmentService,
    private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'] || 0;
    this.getAppointments();
    if (this.id != 0) {
      this.getInvoice();
    }
  }

  getInvoice(): void {
    Swal.fire({
      icon: 'info',
      text: 'Loading...',
      allowOutsideClick: false,
      didOpen: async () => {
        try {
          Swal.showLoading();
          const resp: any = await lastValueFrom(this.invoiceService.getInvoice(this.id));
          this.form.patchValue(resp.data);
          Swal.close();
        } catch (exception: any) {
          console.error(exception.error);
          const message: any = exception.error.message;
          Swal.fire('Error', message, 'error');
        }
      }
    });
  }

  getAppointments(): void {
    Swal.fire({
      icon: 'info',
      text: 'Loading...',
      allowOutsideClick: false,
      didOpen: async () => {
        try {
          Swal.showLoading();
          const resp: any = await lastValueFrom(this.appointmentService.getAppointments());
          this.appointments = resp.data;
          Swal.close();
        } catch (exception: any) {
          console.error(exception.error);
          const message: any = exception.error.message;
          Swal.fire('Error', message, 'error');
        }
      }
    });
  }

  saveInvoice(): void {
    Swal.fire({
      icon: 'info',
      text: 'Saving...',
      allowOutsideClick: false,
      didOpen: async () => {
        try {
          Swal.showLoading();
          if (this.form.invalid) {
            this.form.markAllAsTouched();
            Swal.hideLoading();
            Swal.fire('Error', 'Please fill in all required fields.', 'error');
            return;
          }
          const resp: any = this.id != 0 ? await lastValueFrom(this.invoiceService.updateInvoice(this.id, this.form.value))
            : await lastValueFrom(this.invoiceService.saveInvoice(this.form.value));
          if (resp.data) {
            this.goBack();
            Swal.close();
          } else {
            Swal.fire('Error', 'We had a problem please try again', 'error');
          }
        } catch (exception: any) {
          console.error(exception.error);
          const message: any = exception.error.message;
          Swal.fire('Error', message, 'error');
        }
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/invoices']);
  }

  compareObjects(object1: any, object2: any): boolean {
    return object1 && object2 ? object1.id === object2.id : object1 === object2;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../../core/services/invoice/invoice.service';
import { PatientService } from '../../../core/services/patient/patient.service';
import { AppointmentService } from '../../../core/services/appointment/appointment.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoice-form-page',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './invoice-form-page.component.html',
  styleUrls: ['./invoice-form-page.component.css']
})
export class InvoiceFormPageComponent implements OnInit {
  form: FormGroup;
  isEditing: boolean = false;
  invoiceId: number | null = null;
  patients: any[] = [];
  appointments: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private patientService: PatientService,
    private appointmentService: AppointmentService
  ) {
    this.form = this.formBuilder.group({
      patient: [null, Validators.required],
      appointment: [null, Validators.required],
      totalAmount: ['', [Validators.required, Validators.min(0)]]
    });

    // Check if we're editing an existing invoice
    this.invoiceId = this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : null;
    this.isEditing = !!this.invoiceId;
  }

  ngOnInit(): void {
    this.loadPatients();
    this.loadAppointments();
    if (this.isEditing && this.invoiceId) {
      this.loadInvoice(this.invoiceId);
    }
  }

  loadPatients(): void {
    Swal.fire({
      icon: 'info',
      text: 'Loading...',
      allowOutsideClick: false,
      didOpen: async () => {
        try {
          Swal.showLoading();
          const resp: any = await lastValueFrom(this.patientService.getPatients());
          this.patients = resp.data;
          Swal.close();
        } catch (exception: any) {
          console.error(exception.error);
          const message: any = exception.error.message;
          Swal.fire('Error', message, 'error');
        }
      }
    });
  }

  loadAppointments(): void {
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

  loadInvoice(id: number): void {
    Swal.fire({
      icon: 'info',
      text: 'Loading...',
      allowOutsideClick: false,
      didOpen: async () => {
        try {
          Swal.showLoading();
          const resp: any = await lastValueFrom(this.invoiceService.getInvoice(id));
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

          const invoiceData = this.form.value;
          const resp: any = this.isEditing && this.invoiceId
            ? await lastValueFrom(this.invoiceService.updateInvoice(this.invoiceId, invoiceData))
            : await lastValueFrom(this.invoiceService.saveInvoice(invoiceData));

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

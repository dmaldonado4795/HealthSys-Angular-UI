import { Component } from '@angular/core';
import { Doctor } from '../../../core/models/doctor';
import { Patient } from '../../../core/models/patient';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../core/services/patient/patient.service';
import { DoctorService } from '../../../core/services/doctor/doctor.service';
import { MedicalHistoryService } from '../../../core/services/medical-history/medical-history.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medical-history-form-page',
  imports: [
    SidebarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './medical-history-form-page.component.html',
  styleUrl: './medical-history-form-page.component.css'
})
export class MedicalHistoryFormPageComponent {
  private id: number = 0;
  doctors: Doctor[] = [];
  patients: Patient[] = [];

  form: FormGroup = new FormGroup({
    description: new FormControl(null, [Validators.required]),
    patient: new FormControl(null, [Validators.required]),
    doctor: new FormControl(null, [Validators.required])
  });

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private patientService: PatientService,
    private doctorService: DoctorService,
    private medicalHistoryService: MedicalHistoryService) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'] || 0;
    this.getPatients();
    this.getDoctors();
    if (this.id != 0) {
      this.getMedicalHistory();
    }
  }

  getMedicalHistory(): void {
    Swal.fire({
      icon: 'info',
      text: 'Loading...',
      allowOutsideClick: false,
      didOpen: async () => {
        try {
          Swal.showLoading();
          const resp: any = await lastValueFrom(this.medicalHistoryService.getMedicalHistory(this.id));
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

  getPatients(): void {
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

  getDoctors(): void {
    Swal.fire({
      icon: 'info',
      text: 'Loading...',
      allowOutsideClick: false,
      didOpen: async () => {
        try {
          Swal.showLoading();
          const resp: any = await lastValueFrom(this.doctorService.getDoctors());
          this.doctors = resp.data;
          Swal.close();
        } catch (exception: any) {
          console.error(exception.error);
          const message: any = exception.error.message;
          Swal.fire('Error', message, 'error');
        }
      }
    });
  }

  saveMedicalHistory(): void {
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
          const resp: any = this.id != 0 ? await lastValueFrom(this.medicalHistoryService.updateMedicalHistory(this.id, this.form.value))
            : await lastValueFrom(this.medicalHistoryService.saveMedicalHistory(this.form.value));
          console.log(resp);
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
    this.router.navigate(['/medical-histories']);
  }

  compareObjects(object1: any, object2: any): boolean {
    return object1 && object2 ? object1.id === object2.id : object1 === object2;
  }
}

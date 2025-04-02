import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../core/services/patient/patient.service';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-form-page',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './patient-form-page.component.html',
  styleUrls: ['./patient-form-page.component.css']
})
export class PatientFormPageComponent implements OnInit {
  form: FormGroup;
  isEditing: boolean = false;
  patientId: number | null = null;
  genders: string[] = ['Male', 'Female'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      status: ['Active', Validators.required],
      address: ['']
    });

    // Check if we're editing an existing patient
    this.patientId = this.route.snapshot.paramMap.get('id') ? Number(this.route.snapshot.paramMap.get('id')) : null;
    this.isEditing = !!this.patientId;
  }

  ngOnInit(): void {
    if (this.isEditing && this.patientId) {
      this.loadPatient(this.patientId);
    }
  }

  loadPatient(id: number): void {
    Swal.fire({
      icon: 'info',
      text: 'Loading...',
      allowOutsideClick: false,
      didOpen: async () => {
        try {
          Swal.showLoading();
          const resp: any = await lastValueFrom(this.patientService.getPatientById(id));
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

  savePatient(): void {
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

          const patientData = this.form.value;
          const resp: any = this.isEditing && this.patientId
            ? await lastValueFrom(this.patientService.updatePatient(this.patientId, patientData))
            : await lastValueFrom(this.patientService.savePatient(patientData));

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
    this.router.navigate(['/patients']);
  }
}

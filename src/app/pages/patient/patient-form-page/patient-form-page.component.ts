import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../core/services/patient/patient.service';
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-patient-form-page',
  imports: [
    SidebarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './patient-form-page.component.html',
  styleUrl: './patient-form-page.component.css'
})
export class PatientFormPageComponent {
  private id: number = 0;
  genders:string[] = ['Male', 'Female'];

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    dateOfBirth: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required])
  });

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private patientService: PatientService) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'] || 0;
    if (this.id != 0) {
      this.getPatient();
    }
  }

  getPatient(): void {
    Swal.fire({
      icon: 'info',
      text: 'Loading...',
      allowOutsideClick: false,
      didOpen: async () => {
        try {
          Swal.showLoading();
          const resp: any = await lastValueFrom(this.patientService.getPatientById(this.id));
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

  saveDoctor(): void {
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
          const resp: any = this.id != 0 ? await lastValueFrom(this.patientService.updatePatient(this.id, this.form.value))
            : await lastValueFrom(this.patientService.savePatient(this.form.value));
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

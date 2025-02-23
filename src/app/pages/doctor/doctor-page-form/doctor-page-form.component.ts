import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { DoctorService } from '../../../core/services/doctor/doctor.service';
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-form',
  imports: [
    SidebarComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './doctor-page-form.component.html',
  styleUrl: './doctor-page-form.component.css'
})
export class DoctorPageFormComponent {

  private id: number = 0;
  specialties: string[] = ['Pediatrics', 'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 'Oncology', 'Psychiatry', 'Radiology', 'Urology', 'Endocrinology', 'Anesthesiology', 'Ophthalmology'];

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    specialty: new FormControl(null, [Validators.required])
  });

  constructor(
    private router: Router, 
    private activeRoute: ActivatedRoute, 
    private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'] || 0;
    if (this.id != 0) {
      this.getDoctor();
    }
  }

  getDoctor(): void {
    Swal.fire({
      icon: 'info',
      text: 'Loading...',
      allowOutsideClick: false,
      didOpen: async () => {
        try {
          Swal.showLoading();
          const resp: any = await lastValueFrom(this.doctorService.getDoctorById(this.id));
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
          const resp: any = this.id != 0 ? await lastValueFrom(this.doctorService.updateDoctor(this.id, this.form.value))
            : await lastValueFrom(this.doctorService.saveDoctor(this.form.value));
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
    this.router.navigate(['/doctors']);
  }
}

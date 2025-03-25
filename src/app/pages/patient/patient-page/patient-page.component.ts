import { Component } from '@angular/core';
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { Patient } from '../../../core/models/patient';
import { Router } from '@angular/router';
import { PatientService } from '../../../core/services/patient/patient.service';
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-page',
  imports: [
    CommonModule,
    SidebarComponent
  ],
  templateUrl: './patient-page.component.html',
  styleUrl: './patient-page.component.css'
})
export class PatientPageComponent {
  patients: Patient[] = [];

  constructor(
    private router: Router,
    private patientService: PatientService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    Swal.fire({
      icon: 'info',
      text: 'Loading...',
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        try {
          const resp: any = await lastValueFrom(this.patientService.getPatients());
          this.patients = resp.data;
          Swal.close();
        } catch (error: any) {
          const message = error.error.message;
          Swal.fire('Error', message, 'error');
        }
      }
    });
  }

  goToNewPatient(): void {
    this.router.navigate(['/patient']);
  }

  goToEditPatient(id: number): void {
    this.router.navigate(['/patient', id]);
  }
}

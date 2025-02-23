import { Component } from '@angular/core';
import { DoctorService } from '../../../core/services/doctor/doctor.service';
import { Doctor } from '../../../core/models/doctor';
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../../core/services/session/session.service';
import { Router } from '@angular/router';
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";

@Component({
  selector: 'app-doctor-list',
  imports: [
    CommonModule,
    SidebarComponent
  ],
  templateUrl: './doctor-page.component.html',
  styleUrl: './doctor-page.component.css'
})
export class DoctorPageComponent {

  doctors: Doctor[] = [];

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private doctorService: DoctorService) { }

  ngOnInit(): void {
    if (!this.sessionService.getSession()) {
      this.router.navigate(['/login']);
    }
    this.getDoctors();
  }

  getDoctors(): void {
    Swal.fire({
      icon: 'info',
      text: 'Loading...',
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        try {
          const resp: any = await lastValueFrom(this.doctorService.getDoctors());
          this.doctors = resp.data;
          Swal.close();
        } catch (error: any) {
          const message = error.error.message;
          Swal.fire('Error', message, 'error');
        }
      }
    });
  }

  goToNewDoctor():void{
    this.router.navigate(['/doctor']);
  }

  goToEditDoctor(id: number): void {
    this.router.navigate(['/doctor', id]);
  }
}

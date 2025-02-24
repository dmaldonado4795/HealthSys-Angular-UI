import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { Appointment } from '../../../core/models/appointment';
import { Router } from '@angular/router';
import { SessionService } from '../../../core/services/session/session.service';
import { AppointmentService } from '../../../core/services/appointment/appointment.service';
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-appointment-page',
  imports: [
    CommonModule,
    SidebarComponent
  ],
  templateUrl: './appointment-page.component.html',
  styleUrl: './appointment-page.component.css'
})
export class AppointmentPageComponent {
  
  appointments: Appointment[] = [];

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    if (!this.sessionService.getSession()) {
      this.router.navigate(['/login']);
    }
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
          const resp: any = await lastValueFrom(this.appointmentService.getAppointments());
          this.appointments = resp.data;
          Swal.close();
        } catch (error: any) {
          const message = error.error.message;
          Swal.fire('Error', message, 'error');
        }
      }
    });
  }

  goToNewAppointment(): void {
    this.router.navigate(['/appointment']);
  }

  goToEditAppointment(id: number): void {
    this.router.navigate(['/appointment', id]);
  }
}

import { Component } from '@angular/core';
import { MedicalHistory } from '../../../core/models/medical-history';
import { Router } from '@angular/router';
import { SessionService } from '../../../core/services/session/session.service';
import { MedicalHistoryService } from '../../../core/services/medical-history/medical-history.service';
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-medical-history-page',
  imports: [
    CommonModule,
    SidebarComponent
  ],
  templateUrl: './medical-history-page.component.html',
  styleUrl: './medical-history-page.component.css'
})
export class MedicalHistoryPageComponent {

  medicalHistories: MedicalHistory[] = [];

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private medicalHistoryService: MedicalHistoryService) { }

  ngOnInit(): void {
    if (!this.sessionService.getSession()) {
      this.router.navigate(['/login']);
    }
    this.getMedicalHistories();
  }

  getMedicalHistories(): void {
    Swal.fire({
      icon: 'info',
      text: 'Loading...',
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        try {
          const resp: any = await lastValueFrom(this.medicalHistoryService.getMedicalHistories());
          this.medicalHistories = resp.data;
          console.log(this.medicalHistories);
          Swal.close();
        } catch (error: any) {
          const message = error.error.message;
          Swal.fire('Error', message, 'error');
        }
      }
    });
  }

  goToNewMedicalHistory(): void {
    this.router.navigate(['/medical-history']);
  }

  goToEditMedicalHistory(id: number): void {
    this.router.navigate(['/medical-history', id]);
  }
}

import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login-page.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { authGuardGuard } from './core/services/guard/auth-guard.guard';
import { DoctorPageComponent } from './pages/doctor/doctor-page/doctor-page.component';
import { DoctorPageFormComponent } from './pages/doctor/doctor-page-form/doctor-page-form.component';
import { PatientPageComponent } from './pages/patient/patient-page/patient-page.component';
import { PatientFormPageComponent } from './pages/patient/patient-form-page/patient-form-page.component';
import { AppointmentFormPageComponent } from './pages/appointment/appointment-form-page/appointment-form-page.component';
import { AppointmentPageComponent } from './pages/appointment/appointment-page/appointment-page.component';
import { InvoicePageComponent } from './pages/invoice/invoice-page/invoice-page.component';
import { InvoiceFormPageComponent } from './pages/invoice/invoice-form-page/invoice-form-page.component';
import { MedicalHistoryPageComponent } from './pages/medical-history/medical-history-page/medical-history-page.component';
import { MedicalHistoryFormPageComponent } from './pages/medical-history/medical-history-form-page/medical-history-form-page.component';

export const routes: Routes = [
    { path: 'login', component: LoginPageComponent },
    { path: '', component: HomePageComponent, canActivate: [authGuardGuard] },
    { path: 'home', component: HomePageComponent, canActivate: [authGuardGuard] },
    { path: 'doctors', component: DoctorPageComponent, canActivate: [authGuardGuard] },
    { path: 'doctor', component: DoctorPageFormComponent, canActivate: [authGuardGuard] },
    { path: 'doctor/:id', component: DoctorPageFormComponent, canActivate: [authGuardGuard] },
    { path: 'patients', component: PatientPageComponent, canActivate: [authGuardGuard] },
    { path: 'patient', component: PatientFormPageComponent, canActivate: [authGuardGuard] },
    { path: 'patient/:id', component: PatientFormPageComponent, canActivate: [authGuardGuard] },
    { path: 'appointments', component: AppointmentPageComponent, canActivate: [authGuardGuard] },
    { path: 'appointment', component: AppointmentFormPageComponent, canActivate: [authGuardGuard] },
    { path: 'appointment/:id', component: AppointmentFormPageComponent, canActivate: [authGuardGuard] },
    { path: 'invoices', component: InvoicePageComponent, canActivate: [authGuardGuard] },
    { path: 'invoice', component: InvoiceFormPageComponent, canActivate: [authGuardGuard] },
    { path: 'invoice/:id', component: InvoiceFormPageComponent, canActivate: [authGuardGuard] },
    { path: 'medical-histories', component: MedicalHistoryPageComponent, canActivate: [authGuardGuard] },
    { path: 'medical-history', component: MedicalHistoryFormPageComponent, canActivate: [authGuardGuard] },
    { path: 'medical-history/:id', component: MedicalHistoryFormPageComponent, canActivate: [authGuardGuard] },
    { path: '**', component: HomePageComponent, canActivate: [authGuardGuard] }
];

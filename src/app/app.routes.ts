import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login-page.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { authGuardGuard } from './core/services/guard/auth-guard.guard';
import { DoctorPageComponent } from './pages/doctor/doctor-page/doctor-page.component';
import { DoctorPageFormComponent } from './pages/doctor/doctor-page-form/doctor-page-form.component';
import { PatientPageComponent } from './pages/patient/patient-page/patient-page.component';
import { PatientFormPageComponent } from './pages/patient/patient-form-page/patient-form-page.component';

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
    { path: '**', component: HomePageComponent, canActivate: [authGuardGuard] }
];

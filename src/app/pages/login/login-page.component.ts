import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { lastValueFrom } from 'rxjs';
import { SessionService } from '../../core/services/session/session.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  isLoading = false;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit(): void {
    if (this.sessionService.getSession()) {
      this.router.navigate(['/home']);
    }
  }

  login(): void {
    Swal.fire({
      icon: 'info',
      text: 'Validating credentials...',
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        try {
          if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            Swal.hideLoading();
            Swal.fire('Error', 'Please fill in all required fields.', 'error');
            return;
          }

          const resp: any = await lastValueFrom(this.authService.login(
            this.loginForm.value.username,
            this.loginForm.value.password
          ));
          this.sessionService.createSession(resp.token);
          this.router.navigate(['/home']);
          Swal.close();
        } catch (exception: any) {
          console.error(exception.error);
          const message = exception.error.message;
          Swal.fire('Error', message, 'error');
        }
      }
    });
  }
}

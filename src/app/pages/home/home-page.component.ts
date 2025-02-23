import { Component } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { Router } from '@angular/router';
import { SessionService } from '../../core/services/session/session.service';

@Component({
  selector: 'app-home',
  imports: [SidebarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private router: Router, private sessionService: SessionService) { }

  ngOnInit(): void {
    if (!this.sessionService.getSession()) {
      this.router.navigate(['/login']);
    }
  }
}

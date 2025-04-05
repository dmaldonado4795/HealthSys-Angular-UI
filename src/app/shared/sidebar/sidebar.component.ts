import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSidebarCollapsed = true;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  onNavigate(): void {
    if (window.innerWidth < 992) {
      this.isSidebarCollapsed = true;
    }
  }

  logout(): void {  
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 
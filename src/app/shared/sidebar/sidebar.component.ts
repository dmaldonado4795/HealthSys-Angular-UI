import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSidebarCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  onNavigate(): void {
    // Solo colapsa el sidebar en versión móvil
    if (window.innerWidth < 992) {
      this.isSidebarCollapsed = true;
    }
  }

  logout(): void {
    console.log('Logout clicked');
    // Implement logout logic here
  }
} 
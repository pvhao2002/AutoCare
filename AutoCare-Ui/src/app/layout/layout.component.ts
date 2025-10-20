import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('auth');
    if (!token) {
      this.router.navigate(['/login']).then();
    }
  }

  onQuickAction(): void {
    this.router.navigate(['/services']).then();
  }

  onLogout(): void {
    localStorage.removeItem('auth');
    sessionStorage.removeItem('authUser');
    this.router.navigate(['/login']).then();
  }
}

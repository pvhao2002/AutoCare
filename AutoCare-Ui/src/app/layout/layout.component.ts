import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {CONSTANT} from "../common/constant";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(private router: Router) {
  }


  onQuickAction(): void {
    this.router.navigate(['/services']).then();
  }

  onLogout(): void {
    localStorage.removeItem(CONSTANT.authToken);
    sessionStorage.removeItem('authUser');
    this.router.navigate(['/login']).then();
  }
}

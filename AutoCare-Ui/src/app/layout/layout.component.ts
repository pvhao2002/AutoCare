import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {CONSTANT} from "../common/constant";
import {UserService} from "../common/user.service";
import {TranslatePipe} from "@ngx-translate/core";
import {NgClass} from "@angular/common";

export interface Menu {
  name: string;
  link: string;
  allowRole: string[];
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TranslatePipe, NgClass],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: []
})
export class LayoutComponent implements OnInit {
  readonly ADMIN_ROLE = 'ADMIN';
  readonly MANAGER_ROLE = 'MANAGER';
  readonly STAFF_ROLE = 'STAFF';
  menus: Menu[] = [
    {name: 'Chi nhánh', link: '/branches', allowRole: [this.ADMIN_ROLE]},
    {name: 'Nhân viên', link: '/employees', allowRole: [this.ADMIN_ROLE, this.MANAGER_ROLE]},
    {name: 'Khách hàng', link: '/customers', allowRole: [this.ADMIN_ROLE, this.MANAGER_ROLE, this.STAFF_ROLE]},
    {name: 'Vật tư', link: '/materials', allowRole: [this.ADMIN_ROLE, this.MANAGER_ROLE, this.STAFF_ROLE]},
    {name: 'Kho', link: '/stock', allowRole: [this.ADMIN_ROLE, this.MANAGER_ROLE, this.STAFF_ROLE]},
    {name: 'Trang cá nhân', link: '/profile', allowRole: [this.MANAGER_ROLE, this.STAFF_ROLE]},
  ];

  constructor(protected readonly router: Router,
              protected readonly userService: UserService
  ) {
  }

  onQuickAction(): void {
    this.router.navigate(['/booking']).then();
  }

  onLogout(): void {
    localStorage.removeItem(CONSTANT.authToken);
    sessionStorage.removeItem('authUser');
    this.router.navigate(['/login']).then();
  }

  ngOnInit(): void {
    this.menus = this.menus.filter(e => e.allowRole.includes(this.userService.profile.role));
  }
}

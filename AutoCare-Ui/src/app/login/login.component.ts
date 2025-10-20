import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  remember = false;
  showPwd = false;

  constructor(protected readonly http: HttpClient, protected readonly router: Router) {
  }

  login(): void {
    localStorage.setItem('auth', 'true');
    this.router.navigate(['/']).then();
  }

  togglePwd(): void {
    this.showPwd = !this.showPwd;
  }

  onLogin(): void {
    if (this.username && this.password) {
      localStorage.setItem('auth', 'demo-token');
      this.router.navigate(['/admin']);
    } else {
      alert('Vui lòng nhập đầy đủ thông tin.');
    }
  }

  onQR(): void {
    alert('Tính năng đăng nhập bằng QR sẽ sớm ra mắt.');
  }

  onSSO(): void {
    alert('Đăng nhập SSO đang được phát triển.');
  }
}

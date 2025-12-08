import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ToastService} from "../toast/toast.service";
import {CONSTANT} from "../common/constant";
import {AuthenticationService} from "../common/authentication.service";

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
  showPwd = false;
  showQR = false;

  constructor(protected readonly http: HttpClient,
              protected readonly router: Router,
              protected readonly toast: ToastService,
              protected readonly auth: AuthenticationService) {
  }

  togglePwd(): void {
    this.showPwd = !this.showPwd;
  }

  onLogin(): void {
    if (!this.username || !this.password) {
      this.toast.show('Vui lòng nhập đầy đủ thông tin đăng nhập.', 'error');
      return;
    }

    this.http.post<any>('api/auth/login', {
      username: this.username,
      password: this.password,
    }).subscribe({
      next: (res) => {
        localStorage.setItem(CONSTANT.authToken, res.token);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('username', res.username);
        this.auth.sub(res.token);
        this.toast.show('Đăng nhập thành công', 'success');
        this.router.navigate(['/']).then();
      },
      error: () => {
        this.toast.show('Sai tài khoản hoặc mật khẩu', 'error');
      }
    });
  }


  onQR(): void {
    this.toast.show('Đăng nhập QR Code đang được phát triển.', 'warn');
  }

  onForgotPwd(): void {
    this.toast.show('Chức năng quên mật khẩu đang được phát triển.', 'warn');
  }
}

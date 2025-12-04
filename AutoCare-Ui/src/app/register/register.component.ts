import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {ToastService} from "../toast/toast.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  branches: any = [];

  model: {
    username: string;
    password: string;
    fullName: string;
    branchId: number;
  } = {
    username: '',
    password: '',
    fullName: '',
    branchId: 0
  };

  constructor(protected readonly http: HttpClient
    , protected readonly router: Router
    , protected readonly toast: ToastService) {
  }

  onRegister() {
    if (!this.model.username || !this.model.password || !this.model.fullName || !this.model.branchId) {
      this.toast.show("Vui lòng nhập đầy đủ thông tin", "error");
      return;
    }

    this.http.post('api/auth/register', this.model).subscribe({
      next: () => {
        this.toast.show("Đăng ký thành công!");
        this.router.navigate(['/login']).then();
      },
      error: err => {
        this.toast.show(err.error?.message || "Đăng ký thất bại", "error");
      }
    });
  }

  ngOnInit(): void {
    this.http.get<any>('api/branches').subscribe({
      next: data => {
        this.branches = data;
      }
    })
  }
}

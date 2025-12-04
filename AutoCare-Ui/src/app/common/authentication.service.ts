import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {CONSTANT} from './constant';
import {LoginDTO, LoginResponseDTO} from "./model/auth.model";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUser = new BehaviorSubject<LoginResponseDTO>(new LoginResponseDTO());
  private refreshing = false;

  constructor(private http: HttpClient) {
    if (this.isTokenValid()) {
      const currentUser = new LoginResponseDTO(this.getLocalToken());
      this.currentUser.next(currentUser);
    }
  }

  get userInfo(): LoginResponseDTO {
    return this.currentUser.value;
  }

  sub(token: string): void {
    const currentUser = new LoginResponseDTO(token);
    this.currentUser.next(currentUser);
  }


  public logout() {
    this.removeTokenStorage();
    this.redirectLogin();
  }

  getCurrentUser(): Observable<LoginResponseDTO> {
    return this.currentUser.asObservable();
  }

  getToken(): string {
    return `Bearer ${this.currentUser.value.token}`;
  }

  isTokenValid(): boolean {
    return !!this.getLocalToken();
  }

  getLocalToken(): string | null {
    return localStorage.getItem(CONSTANT.authToken);
  }

  isRefreshing(): boolean {
    return this.refreshing;
  }

  removeTokenStorage(): void {
    this.currentUser.next(new LoginResponseDTO());
    localStorage.removeItem(CONSTANT.authToken);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
  }

  setTokenStorage(user: LoginResponseDTO): void {
    if (user) {
      localStorage.setItem(CONSTANT.authToken, JSON.stringify(user));
      this.currentUser.next(user);
    } else {
      localStorage.removeItem(CONSTANT.authToken);
    }
  }

  login(username: string, password: string, captchaCode = '') {
    return this.http.post<any>('/api/user/sign-in', {username, password, captcha: captchaCode})
      .pipe(
        tap((res) => {
          if (res.status) {
            this.setTokenStorage(res.data);
          } else {
            this.logout();
          }
        }),
      );
  }

  loginV2(payload: LoginDTO) {
    return this.login(payload.username, payload.password, payload.captcha);
  }

  redirectLogin() {
    window.location.href = `/#/${CONSTANT.loginPath}`;
  }
}

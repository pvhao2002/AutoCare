import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResolveFn} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

export class Branch {
  constructor(
    public id: number = 0,
    public branchName: string = '',
    public address: string = '',
    public createdAt: string = '',
    public updatedAt: string = '',
    public active: boolean = true,
    public branchCode: string = '',
  ) {
  }
}

export class UserInfo {
  constructor(
    public id: number = 0,
    public username: string = '',
    public fullName: string = '',
    public role: string = '',
    public active: boolean = true,
    public branch: Branch = new Branch(),
    public needCreateProfile: boolean = false,
  ) {
  }
}

@Injectable({providedIn: 'root'})
export class UserService {
  private userProfile = new UserInfo();

  constructor(
    protected readonly httpClient: HttpClient,
    protected readonly authService: AuthenticationService
  ) {
  }

  get isAdmin(): boolean {
    return this.userProfile.role === 'admin';
  }

  get profile(): UserInfo {
    return this.userProfile;
  }

  setProfile(profile = new UserInfo()): void {
    this.userProfile = profile;
  }

  getProfileData(): Observable<UserInfo> {
    return new Observable<UserInfo>((subscriber) => {
      const sub = this.httpClient.get<UserInfo>('api/users/info').subscribe({
        next: (res) => {
          const profile = new UserInfo(
            res.id,
            res.username,
            res.fullName,
            res.role,
            res.active,
            new Branch(
              res.branch?.id,
              res.branch?.branchName,
              res.branch?.address,
              res.branch?.createdAt,
              res.branch?.updatedAt,
              res.branch?.active,
            ),
            res.needCreateProfile
          );
          this.setProfile(profile);
          subscriber.next(res);
        },
        error: (err) => {
          if (err.status === 401 || err.status === 403) {
            this.authService.logout();
          }
          subscriber.error(err.error);
        },
        complete: () => subscriber.complete()
      });
      return () => sub.unsubscribe();
    });
  }
}

export const profileResolver: ResolveFn<Observable<UserInfo>> = () => {
  return inject(UserService).getProfileData();
};


import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject, Observable} from 'rxjs';

export interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

interface ConfirmState extends ConfirmOptions {
  subject: Subject<boolean>;
}

@Injectable({providedIn: 'root'})
export class ConfirmService {
  private _state$ = new BehaviorSubject<ConfirmState | null>(null);
  state$ = this._state$.asObservable();

  open(options: ConfirmOptions): Observable<boolean> {
    const subject = new Subject<boolean>();

    this._state$.next({
      title: options.title ?? 'Xác nhận',
      message: options.message ?? 'Bạn chắc chứ?',
      confirmText: options.confirmText ?? 'Đồng ý',
      cancelText: options.cancelText ?? 'Huỷ',
      subject
    });

    return subject.asObservable();
  }

  resolve(result: boolean) {
    const current = this._state$.value;
    if (current) {
      current.subject.next(result);
      current.subject.complete();
      this._state$.next(null);
    }
  }
}

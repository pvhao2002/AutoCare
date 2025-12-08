import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ToastService {
  toasts = signal<{ type: string; message: string }[]>([]);

  show(message: string, type: 'success' | 'error' | 'info' | 'warn' = 'success') {
    const toast = {type, message};
    this.toasts.update(list => [...list, toast]);

    setTimeout(() => {
      this.toasts.update(list => list.filter(t => t !== toast));
    }, 3000);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  warn(message: string) {
    this.show(message, 'warn');
  }
}

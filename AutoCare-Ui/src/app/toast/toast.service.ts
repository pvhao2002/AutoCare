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

  close(toast: { type: string; message: string }) {
    this.toasts.update(list => list.filter(t => t !== toast));
  }

  remove(index: number) {
    this.toasts.update(list => list.filter((_, idx) => idx !== index));
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

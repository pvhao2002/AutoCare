import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastService} from './toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./toast.component.scss'],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  constructor(protected readonly toastService: ToastService) {
  }
}

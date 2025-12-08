import {Component} from '@angular/core';
import {ConfirmService} from "./confirm.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  vm$ = this.confirmService.state$;

  constructor(private confirmService: ConfirmService) {
  }

  onBackdropClick() {
    this.confirmService.resolve(false);
  }

  onCancel() {
    this.confirmService.resolve(false);
  }

  onConfirm() {
    this.confirmService.resolve(true);
  }
}

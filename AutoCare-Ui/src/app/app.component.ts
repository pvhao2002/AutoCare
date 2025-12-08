import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToastComponent} from "./toast/toast.component";
import {ModalComponent} from "./modal/modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AutoCare-Ui';
}

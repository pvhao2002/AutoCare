import {Component, OnInit} from '@angular/core';
import {UserService} from "../common/user.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {


  constructor(
    protected readonly userService: UserService
  ) {
  }

  ngOnInit(): void {
  }
}

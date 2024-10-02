import { Component, HostListener } from '@angular/core';
import { UserService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  willShowUsers: boolean = true;
  textColorForChange: string = 'green';

  constructor(public userService: UserService) {}

  triggerColorChange() {
    this.userService.colorHasChanged.next(this.textColorForChange);
  }

  setShowUsers(showUsers: boolean) {
    this.willShowUsers = showUsers;
  }
}

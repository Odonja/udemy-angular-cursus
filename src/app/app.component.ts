import { Component, HostListener } from '@angular/core';
import { UserService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  willShowUsers: boolean = true;

  title = 'ClientApp';
  helloWorld: string = 'Hello World';
  // string interpolation => to show the value of a variable in the html, to do so put the variable name in {{}}

  clicked: number = 0;
  doubleClicked: number = 0;
  willShowBlock: boolean = true;
  valuesToLoopThrough: number[] = [4, 2, 5, 8, 235, 2, 6, 7, 34, 7, 3];

  contextMenuInfo: any = {
    pageX: 0,
    pageY: 0,
    willShow: false,
  };
  tooltipInfo: any = {
    pageX: 0,
    pageY: 0,
    willShow: false,
  };

  contextClicked: boolean = false;

  textColorForChange: string = 'green';

  constructor(public userService: UserService) {}

  triggerColorChange() {
    this.userService.colorHasChanged.next(this.textColorForChange);
  }

  incrementClicked() {
    this.clicked++;
  }
  incrementDoubleClicked() {
    this.doubleClicked++;
  }

  toggleContextMenu(showContextMenu: boolean, event: MouseEvent | null = null) {
    if (event != null) {
      event.preventDefault();
      this.contextMenuInfo.pageX = event.pageX;
      this.contextMenuInfo.pageY = event.pageY;
    }
    this.contextMenuInfo.willShow = showContextMenu;
  }

  @HostListener('document:click')
  closeContextMenu() {
    setTimeout(() => {
      if (!this.contextClicked) {
        this.toggleContextMenu(false);
      }
    }, 10);
  }

  contextClick() {
    this.contextClicked = true;
    setTimeout(() => {
      this.contextClicked = false;
    }, 20);
  }

  onMouseMove(inside: boolean, event: MouseEvent) {
    if (this.tooltipInfo.willShow !== inside) {
      this.tooltipInfo.willShow = inside; // this is so that the dom does not have to constantly update when you stay in place, prevents flickering
    }
    this.tooltipInfo.pageX = event.pageX - 50;
    this.tooltipInfo.pageX < 0 ? 0 : this.tooltipInfo.pageX;
    this.tooltipInfo.pageY = event.pageY + 15;
  }

  setShowUsers(showUsers: boolean) {
    this.willShowUsers = showUsers;
  }
}

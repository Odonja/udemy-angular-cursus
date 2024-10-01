import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-users-single',
  templateUrl: './users-single.component.html',
  styleUrl: './users-single.component.css',
})
export class UsersSingleComponent implements OnInit, OnDestroy {
  // @Input() user: string | null = null;
  // @Input() user: string = ''; // input means we can receive this value
  @Input() userIndex: number = -1;
  @Input() addMode: boolean = false;
  // @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();
  editMode: boolean = false;
  userForEdit: User;

  textColor: any = {
    color: 'green',
  };
  colorHasChangedSubscription: Subscription = new Subscription();

  constructor(
    public userService: UserService // public because we access it from the html // private userService: UserService // we would use private if we only accessed it in the typescript file
  ) {
    this.userForEdit = { ...this.userService.emptyUser };
  }

  ngOnDestroy(): void {
    this.colorHasChangedSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.colorHasChangedSubscription =
      this.userService.colorHasChanged.subscribe((newColor) => {
        console.log(newColor);
        this.textColor.color = newColor;
      });
  }

  toggleEdit(
    editMode: boolean,
    user: User = { ...this.userService.emptyUser }
  ) {
    this.editMode = editMode;
    this.userForEdit = { ...user };
    if (!editMode) {
      this.userService.usersHaveChanged.next(true);
    }
  }

  submitEdit() {
    if (this.addMode) {
      this.userService.addUser(this.userForEdit);
    } else {
      this.userService.editUser(this.userForEdit);
      // this.toggleEdit(false); // this was not needed because when saving the edit, the array was changed, so the whole list
      // will be reset, and this component will be recreated with an edit mode of false
    }
  }
}

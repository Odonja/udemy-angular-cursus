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
import { ActivatedRoute, Router } from '@angular/router';

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
  userId: number = -1;
  // @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();
  editMode: boolean = false;
  displayUser: boolean = false;
  userForEdit: User;
  userForDisplay: User;
  isSingleUser: boolean = false;

  textColor: any = {
    color: 'green',
  };
  colorHasChangedSubscription: Subscription = new Subscription();
  usersHaveChangedSubscription: Subscription = new Subscription();

  constructor(
    public userService: UserService, // public because we access it from the html // private userService: UserService // we would use private if we only accessed it in the typescript file
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForEdit = { ...this.userService.emptyUser };
    this.userForDisplay = { ...this.userService.emptyUser };
  }

  ngOnInit(): void {
    this.colorHasChangedSubscription =
      this.userService.colorHasChanged.subscribe((newColor) => {
        console.log(newColor);
        this.textColor.color = newColor;
      });
    this.subscribeParams();
    this.setUserForDisplay();
  }

  goToSingleUser(userId: number) {
    // this.router.navigate(['user/' + userId]);
    this.router.navigate(['user', userId]);
  }

  goToUserList() {
    this.router.navigate(['user']);
  }

  setUserForDisplay() {
    if (this.userIndex !== -1) {
      this.userForDisplay = this.userService.userList[this.userIndex];
      this.displayUser = true;
    }
  }

  subscribeParams() {
    this.route.params.subscribe((params) => {
      if (params['userId']) {
        this.isSingleUser = true;
        this.userId = +params['userId'];
        this.getUserById();
        this.usersHaveChangedSubscription =
          this.userService.usersHaveChanged.subscribe(() => {
            this.getUserById();
          });
      }
    });
  }

  getUserById() {
    if (this.userId > 0) {
      this.userService.getSingleUser(this.userId).subscribe({
        next: (response) => {
          if (response) {
            this.userForDisplay = response;
            this.displayUser = true;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.colorHasChangedSubscription.unsubscribe();
    this.usersHaveChangedSubscription.unsubscribe();
  }

  toggleEdit(
    editMode: boolean,
    user: User = { ...this.userService.emptyUser }
  ) {
    console.log('edit mode is ' + editMode);
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
      this.toggleEdit(false);
    }
  }
}

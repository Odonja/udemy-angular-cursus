import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/User.model';
import { Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-users', // this is for you html, this is your tag when you want to use the component
  templateUrl: './users.component.html',
  // styleUrl: './users.component.css' // if you want just the standard one
  styleUrls: ['./users.component.css', '../app.component.css'], // if you want to add extra css files
})
export class UsersComponent implements OnInit, OnDestroy {
  testUser = 'Bella';
  usersHaveChangedSubscription: Subscription = new Subscription();
  addingNewUser: boolean = false;
  userSearch: string = '';
  // userList = [
  //   'Tucker Anselm',
  //   'Elmira Keddy',
  //   'Eveline Grandisson',
  //   'Berry Wildes',
  //   'Quintus Hastings',
  //   'Harp Antonignetti',
  //   'Vite Playfair',
  //   'Noelle Dowears',
  //   'Delcine Lubbock',
  //   'Auberta Skerrett',
  //   'Constantin Cosgry',
  //   'Loleta Grenfell',
  //   'Nadeen Matchett',
  //   'Elli Galliver',
  //   'Gayla Hawtin',
  //   'Liam Antwis',
  //   'Merilyn Baumford',
  //   'Lilas Colquyte',
  //   'Roi Kinworthy',
  //   'Patin Flecknoe',
  //   'Etienne Vedeneev',
  //   'Diane Evesque',
  //   'Ashlee Amoore',
  //   'Julissa Bandey',
  //   'Merridie McPartling',
  //   'Nanete Kitlee',
  // ];
  constructor(
    public userService: UserService // public because we access it from the html // private userService: UserService // we would use private if we only accessed it in the typescript file
  ) {}

  ngOnInit(): void {
    this.getUsers();
    console.log('component has been created');
    this.usersHaveChangedSubscription =
      this.userService.usersHaveChanged.subscribe(
        (changesCancelled: boolean) => {
          if (!changesCancelled) {
            this.getUsers();
          }
          this.addingNewUser = false;
        }
      );
  }

  // removeUser(index: number) {
  //   this.userService.userList.splice(index, 1);
  // }

  ngOnDestroy(): void {
    this.usersHaveChangedSubscription.unsubscribe();
    console.log('component has been destroyed');
  }

  addNewUser() {
    this.addingNewUser = true;
  }

  getUsers() {
    let responseObject: Partial<Observer<User[]>> = {
      next: (res: User[]) => {
        this.userService.userList = res;
        // res.forEach((row: User) => {
        //   console.log(row.fullName + " " + row.city);
        // });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    };

    if (!this.userSearch) {
      this.userService.getUser().subscribe(responseObject);
    } else {
      this.userService.getUser(this.userSearch).subscribe(responseObject);
    }
  }
}

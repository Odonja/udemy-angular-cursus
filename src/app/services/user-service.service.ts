import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/User.model';
// providedIn: 'root' means that where we are going to have the same instance of the service
// without it each component would have its own instance of the service, so if 1 instance changed it the other components would not see it
// with providedIn: 'root'  is 1 changes all other would see the change
@Injectable({ providedIn: 'root' })
export class UserService {
  colorHasChanged: Subject<string> = new Subject<string>();
  usersHaveChanged: Subject<boolean> = new Subject<boolean>();

  emptyUser: User = {
    userId: 0,
    username: '',
    fullName: '',
    city: '',
    gender: '',
    favoriteColor: '',
    favoriteAnimal: '',
  };

  userList: User[] = [];
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

  constructor(public httpService: HttpClient) {}

  getUser(searchText: string = '') {
    if (searchText === '') {
      // you could also do if(!searchText), in case the value could be a null or undefined
      // this.httpService.get('http://localhost:3000/user/users'); // this just creates the request, it does not send it
      return this.httpService.get<User[]>('http://localhost:3000/user/users'); // this just creates the request, it does not send it
    } else {
      return this.httpService.get<User[]>(
        'http://localhost:3000/user/userSearch/' + searchText
      );
    }
  }

  postUser(userForAdd: User) {
    return this.httpService.post(
      'http://localhost:3000/user/addUser',
      userForAdd
    );
  }

  putUser(userForEdit: User) {
    return this.httpService.put(
      'http://localhost:3000/user/editUser',
      userForEdit
    );
  }

  removeUser(userId: number) {
    // this.userList.splice(index, 1);
    if (confirm('Are you sure you want to delete this user?')) {
      this.deleteUser(userId).subscribe({
        next: () => {
          alert('The delete was successfull!');
          this.usersHaveChanged.next(false);
        },
        error: (err) => {
          console.log(err);
          alert('The user delete failed! Please try again later.');
        },
      });
    }
  }

  addUser(user: User) {
    // this.userList[index] = user;
    this.postUser(user).subscribe({
      next: () => {
        alert('Adding a user was successfull!');
        this.usersHaveChanged.next(false);
      },
      error: (err) => {
        console.log(err);
        alert('Adding a user failed! Please try again later.');
      },
    });
  }

  editUser(user: User) {
    // this.userList[index] = user;
    this.putUser(user).subscribe({
      next: () => {
        alert('The edit was successfull!');
        this.usersHaveChanged.next(false);
      },
      error: (err) => {
        console.log(err);
        alert('The user edit failed! Please try again later.');
      },
    });
  }

  deleteUser(userId: number) {
    return this.httpService.delete(
      'http://localhost:3000/user/deleteUser/' + userId
    );
  }
}

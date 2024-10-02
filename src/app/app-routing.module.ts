import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UsersComponent } from './users/users.component';
import { UsersSingleComponent } from './users/users-single/users-single.component';

// routes will be evaluated from top to bottom
// when there is a match on more than 1 route, we will go to the one higher on the list
const routes: Routes = [
  //   { path: '', redirectTo: 'login' }, // if you were to have this at the start, everything would match, so it wil redirect to login,
  //but then this first one would match again and redirect again, creating an endless loop

  { path: '', redirectTo: 'login', pathMatch: 'full' }, // if you add full it has to exactly match, this will prevent that endless loop
  { path: 'login', component: LoginComponent },
  {
    path: 'user',
    children: [
      { path: '', component: UsersComponent, pathMatch: 'full' },
      { path: ':userId', component: UsersSingleComponent },
    ],
  },
  { path: '**', redirectTo: 'login' }, // ** to match anything for when all other paths didnt match
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

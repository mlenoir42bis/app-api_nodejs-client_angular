import { NgModule } from '@angular/core';
import { Routes} from '@angular/router';

import {HomepageComponent} from './homepage/homepage.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import { ProfilComponent } from './profil/profil.component';

import { AuthGuard } from './share/guards/auth.guard';

export const APP_ROUTING: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'profil', canActivate: [AuthGuard],component: ProfilComponent},
];
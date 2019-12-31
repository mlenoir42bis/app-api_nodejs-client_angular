import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../models/user.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { switchMap, tap, map } from 'rxjs/operators';
import { timer, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.API_URL;
 
  constructor(
      private http: HttpClient,
      private router: Router,
      private userService: UserService
    ) {

  }

  public logout(): Observable<any> {
    return this.http.get<{}>(`${this.API_URL}/auth/signout`).pipe(
      tap(( res : any ) => {
        this.userService.currentUser.next(null);
      })
    );
  }
  
  public signup(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/users`, user);
  }
  
  public signin(credentials: { email: string, password: string}): Observable<string> {
    return this.http.post<string>(`${this.API_URL}/auth/signin`, credentials).pipe(
      tap(( user : any ) => {
        this.userService.currentUser.next(user);
      })
    );
  }

}

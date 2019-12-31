import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  public currentUser: BehaviorSubject<User> = new BehaviorSubject(null);
  private API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { 
  }
 
  public getCurrentUser(): Observable<User> {
    if (this.currentUser.value) {
      return this.currentUser;
    } else {
      return this.http.get<User>(`${this.API_URL}/users/current`).pipe(
        tap( (user: User) => {
          this.currentUser.next(user);
        }),
        switchMap( () => {
          return this.currentUser;
        })
      );
    }
  }

}
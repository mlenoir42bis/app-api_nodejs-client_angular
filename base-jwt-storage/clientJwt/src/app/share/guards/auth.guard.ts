import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { JwtToken } from '../models/JwtToken.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.jwtToken.pipe(
      map( (jwtToken: JwtToken) => {
        if (jwtToken.isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/signin']);
          return false;
        }
      })
    );
  }
}

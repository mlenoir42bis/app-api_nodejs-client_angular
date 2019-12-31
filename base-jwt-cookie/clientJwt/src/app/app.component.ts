import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute, Event, NavigationStart, NavigationError } from '@angular/router';

import { User } from './share/models/user.model';
import { UserService } from './share/services/user.service';

import { AuthService } from './share/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
    ) {
      
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
        }
        if (event instanceof NavigationStart) { 
          userService.getCurrentUser().subscribe( (user: User) => {
            this.user = user;
          }, err => {
            this.user = null;
          }); 
        }
        if (event instanceof NavigationError) {
            console.log(event.error);
        }
    });

    }

    ngOnInit() {
    }
  
    ngOnDestroy() {
    }
  
  
}

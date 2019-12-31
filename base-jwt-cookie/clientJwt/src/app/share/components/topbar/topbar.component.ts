import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, OnDestroy {

  @Input() isAutenticated: Boolean;

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public logout(): void {
    this.authService.logout().subscribe( () => {
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
    });
  }
  
}
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from '../../share/services/auth.service';
import { Router } from '@angular/router';

import { User } from '../../share/models/user.model';

@Component({
 selector: 'app-signup',
 templateUrl: './signup.component.html',
 styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: [''],
      email: [''],
      password: ['']
    });
  }

  public trySignup(): void {
    this.authService.signup(this.signupForm.value).subscribe( (user: User) => {
      this.router.navigate(['/signin']);
    }, err => {
      console.log(err);
    });
  }
}
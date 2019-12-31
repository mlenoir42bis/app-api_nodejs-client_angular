import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../share/services/auth.service';
import { Router } from '@angular/router';


@Component({
 selector: 'app-signin',
 templateUrl: './signin.component.html',
 styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  public trySignin() {
    this.authService.signin(this.signinForm.value).subscribe( () => {
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
    });
  }
}
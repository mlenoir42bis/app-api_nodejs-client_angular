import { Component, OnInit } from '@angular/core';
import { User } from '../share/models/user.model';
import { UserService } from '../share/services/user.service';
import { Observable } from 'rxjs';

@Component({
 selector: 'app-profil',
 templateUrl: './profil.component.html',
 styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
 public currentUser: Observable<User>;

 constructor(private userService: UserService) { }

 ngOnInit() {
   this.currentUser = this.userService.getCurrentUser();
 }

}
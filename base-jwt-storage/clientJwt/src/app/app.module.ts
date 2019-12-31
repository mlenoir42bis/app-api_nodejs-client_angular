//module natif
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


//components
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { TopbarComponent } from './share/components/topbar/topbar.component';
import { ProfilComponent } from './profil/profil.component';

//modules
import { LayoutModule } from './share/layout/layout.module';

//router
import {RouterModule} from '@angular/router';
import {APP_ROUTING} from './app.routing';

//services
import { AuthService } from './share/services/auth.service';
import { UserService } from './share/services/user.service';

//guards
import { AuthGuard } from './share/guards/auth.guard'

//interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './share/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    SignupComponent,
    SigninComponent,
    TopbarComponent,
    ProfilComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    RouterModule.forRoot(APP_ROUTING)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService, 
    UserService, 
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

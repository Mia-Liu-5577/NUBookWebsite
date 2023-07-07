import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatDatepickerModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatChipsModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { HeadlineComponent } from './main/headline/headline.component';
import { FollowingComponent } from './main/following/following.component';
import { PostsComponent } from './main/posts/posts.component';
import { RouterModule, Routes} from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MatListModule } from '@angular/material';

export const routes: Routes = [{ path: '', component : AuthComponent },
                               { path: 'auth', component : AuthComponent },
                               { path: 'main', component : MainComponent },
                               { path: 'profile', component : ProfileComponent }];


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    MainComponent,
    HeadlineComponent,
    FollowingComponent,
    PostsComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

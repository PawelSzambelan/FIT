import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartViewComponent } from './user/start-view/start-view.component';
import { LoginViewComponent } from './user/login-view/login-view.component';
import { RegisterViewComponent } from './user/register-view/register-view.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { DietViewComponent } from './home/diet-view/diet-view.component';
import { ProfileViewComponent } from './home/profile-view/profile-view.component';
import { ProfileViewEditComponent } from './home/profile-view-edit/profile-view-edit.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [{ path: '', component: StartViewComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: LoginViewComponent }]
  },
  {
    path: 'register', component: UserComponent,
    children: [{ path: '', component: RegisterViewComponent }]
  },
  {
    path: 'home', component: HomeComponent, canActivate:[AuthGuard],
    children: [
      { path: '', component: DietViewComponent },
      { path: 'diet', component: DietViewComponent },
      { path: 'profile', component: ProfileViewComponent },
      { path: 'profileEdit', component: ProfileViewEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = 
  [UserComponent, StartViewComponent, LoginViewComponent,
  RegisterViewComponent, HomeComponent, DietViewComponent,
  ProfileViewComponent, ProfileViewEditComponent]

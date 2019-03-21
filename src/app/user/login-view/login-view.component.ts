import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styles: []
})

export class LoginViewComponent implements OnInit {
  isLoginError: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  OnSubmit(email, password) {
    this.userService.userAuthentication(email, password).subscribe((data: any) => {
      localStorage.setItem('userToken', data.token);
      this.router.navigate(['/home']);
    },
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
    });
  }

}

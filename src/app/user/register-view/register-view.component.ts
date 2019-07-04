import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styles: []
})
export class RegisterViewComponent implements OnInit {
  user: User;
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,20}$/;

  isRegisterError: boolean = false;
  activity_level: any = [];
  genders: any = [
    {
      gender : 'FEMALE',
      name : 'Kobieta' },
    {
      gender : 'MALE',
      name : 'Mężczyzna' }
    ];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loadActivity();
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      email:	'',
      password:	'',
      gender:	'FEMALE',
      age: 0,
      weight: 0,
      height:	0,
      id_activity_level: 1
    }
  }

  loadActivity() {
    return this.userService.getActivityLevel().subscribe((data: {}) => {
      console.log("data" + data);
      this.activity_level = data;
    })
  }

  OnSubmit(form: NgForm) {

    this.userService.registerUser(form.value).subscribe((data: any) => {
        this.router.navigate(['/']);
    },
    (err: HttpErrorResponse) => {
        this.isRegisterError = true;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  userData: any;
  constructor(private router: Router) { }

  ngOnInit() {;
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/']);
  }

}

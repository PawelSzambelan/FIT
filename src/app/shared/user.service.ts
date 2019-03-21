import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {
  readonly apiURL: string = 'https://hashfit.herokuapp.com';
  constructor(private http: HttpClient) { }

  userAuthentication(email, password) {
    // email!!!
    var data = JSON.stringify({ username: email, password: password });
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS' });
    return this.http.post(this.apiURL + '/authorization/login', data, { headers: reqHeader });
  }
}
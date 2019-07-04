import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    readonly apiURL: string = 'https://hashfit.herokuapp.com';

    constructor(private http: HttpClient) {
    }

    getActivityLevel() {
        return this.http.get(this.apiURL + '/user/activity-levels')
    }

    registerUser(user: User) {
        const userBody: User = {
            email: user.email,
            password: user.password,
            gender: user.gender,
            age: user.age,
            weight: user.weight,
            height: user.height,
            id_activity_level: user.id_activity_level
        }
        return this.http.post(this.apiURL + '/authorization/register', userBody);
    }

    userAuthentication(email: String, password: String) {
        var data = JSON.stringify({email: email, password: password});
        var reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post(this.apiURL + '/authorization/login', data, {headers: reqHeader});
    }

 }

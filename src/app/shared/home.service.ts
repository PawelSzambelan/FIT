import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {homeData} from "../models/homeData.model";

@Injectable()
export class HomeService {
    readonly apiURL: string = 'https://hashfit.herokuapp.com';

    constructor(private http: HttpClient) {
    }

    getActivityLevel() {
        return this.http.get(this.apiURL + '/user/activity-levels')
    }

    getUserData(token: string) {
        let header = new HttpHeaders().set('auth-token', token);
        return this.http.get(this.apiURL + '/user/profile-data', {headers: header})
    }

    editUserData(token:string,user: homeData){
        const userBody: homeData = {
            email: user.email,
            gender: user.gender,
            age: user.age,
            weight: user.weight,
            height: user.height,
            id_activity_level: user.id_activity_level,
        };
        let header = new HttpHeaders({'Content-Type': 'application/json'}).set('auth-token', token);
        return this.http.put(this.apiURL + '/user/profile-data/update',userBody,{headers: header})
    }
}

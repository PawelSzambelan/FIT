import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { newTarget } from '../models/newTarget.model';

@Injectable({
    providedIn: 'root'
})

export class TargetService {
    readonly apiURL: string = 'https://hashfit.herokuapp.com';


    constructor(private http: HttpClient) {
    }

    addTarget(token: string, target: newTarget) {
        const targetBody: newTarget = {
            date: target.date,
            weight: target.weight
        };
        // console.log(targetBody);
        let header = new HttpHeaders({'Content-Type': 'application/json'}).set('auth-token', token);
        return this.http.post(this.apiURL + '/user/weight-targets', targetBody, {headers: header});
    }

    getTargets(token: string) {
        let header = new HttpHeaders().set('auth-token', token);
        return this.http.get(this.apiURL + '/user/weight-targets', {headers: header})
    }

    getWeightStates(token: string) {
        let header = new HttpHeaders().set('auth-token', token);
        return this.http.get(this.apiURL + '/user/weight-states', {headers: header})
    }

    deleteTarget(token: string, idTarget: number) {
        let header = new HttpHeaders().set('auth-token', token);
        return this.http.delete(this.apiURL + '/user/weight-targets/' + idTarget, {headers: header})
    }

}

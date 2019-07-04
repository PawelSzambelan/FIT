import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutritionsService {
  readonly apiURL: string = 'https://hashfit.herokuapp.com';


  constructor(private http: HttpClient) {
  }

  getNutritionsForDay(token: string, date: string) {
    let header = new HttpHeaders().set('auth-token', token);
    return this.http.get(this.apiURL + '/diet/nutrition-values/day/' + date, {headers: header})
  }

  getNutritionsForUser(token: string, date: string) {
    let header = new HttpHeaders().set('auth-token', token);
    return this.http.get(this.apiURL + '/diet/nutrition-values/user/' + date, {headers: header})
  }

  getNutritionsForMeals(token: string, date: string) {
    let header = new HttpHeaders().set('auth-token', token);
    return this.http.get(this.apiURL + '/diet/nutrition-values/meal/' + date, {headers: header})
  }
}

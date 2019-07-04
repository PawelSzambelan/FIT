import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { newMeal } from '../models/newMeal.model';

@Injectable({
  providedIn: 'root'
})

export class MealService {
  readonly apiURL: string = 'https://hashfit.herokuapp.com';


  constructor(private http: HttpClient) {
  }

  addMeal(token: string, meal: newMeal) {
    const mealBody: newMeal = {
      date: meal.date,
      name:	meal.name,
      time: meal.time,
    };
    let header = new HttpHeaders({'Content-Type': 'application/json'}).set('auth-token', token);
    return this.http.post(this.apiURL + '/diet/meals', mealBody, {headers: header});
  }

  getMeals(token: string, date: string) {
    let header = new HttpHeaders().set('auth-token', token);
    return this.http.get(this.apiURL + '/diet/meals/' + date, {headers: header})
  }

  deleteMeal(token: string, idMeal: number) {
    let header = new HttpHeaders().set('auth-token', token);
    return this.http.delete(this.apiURL + '/diet/meals/' + idMeal, {headers: header})
  }
}

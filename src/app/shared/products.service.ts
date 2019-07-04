import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from '../models/product.model';
import { addMealProductData } from '../models/addMealProductData.model';
import { newProduct } from '../models/newProduct.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly apiURL: string = 'https://hashfit.herokuapp.com';


  constructor(private http: HttpClient) {
  }

  addProduct(token: string, productToAdd: product){
    /*
    const productBody: newProduct = {
      name: productToAdd.name,
      producer:	productToAdd.producer,
      calories: productToAdd.calories,
      fat_grams: productToAdd.fat_grams,
      carbohydrates_grams: productToAdd.carbohydrates_grams,
      protein_grams: productToAdd.protein_grams,
    };
    */

    productToAdd.id_product = 0;

    //alert(productToAdd.name);

    let header = new HttpHeaders({'Content-Type' : 'application/json'}).set('auth-token', token);
    return this.http.post(this.apiURL + '/products', productToAdd, {headers: header});
    
  }

  addMealProduct(token: string, idMealParam: number, idMealProduct: number, productAmountParam: number) {
    let header = new HttpHeaders({'Content-Type': 'application/json'}).set('auth-token', token);

    let productToAdd = new addMealProductData();
    
    productToAdd.idMeal=idMealParam;
    productToAdd.idProduct=idMealProduct;
    productToAdd.productAmount=productAmountParam;

    return this.http.post(this.apiURL + '/diet/meal-products', productToAdd, {headers: header});
  }  

  getMealsProducts(token: string, date: string) {
    let header = new HttpHeaders().set('auth-token', token);
    return this.http.get(this.apiURL + '/diet/meal-products/' + date, {headers: header})
  }
  
  getProducts(token: string) {
    let header = new HttpHeaders().set('auth-token', token);
    return this.http.get(this.apiURL + '/products/', {headers: header});
  }

  getProductsByPattern(token: string, pattern: string) {

    let header = new HttpHeaders().set('auth-token', token);
    return this.http.get(this.apiURL + '/products/' + pattern, {headers: header});

  }

  deleteMealProduct(token: string, idMealProduct: number) {
    let header = new HttpHeaders().set('auth-token', token);
    return this.http.delete(this.apiURL + '/diet/meal-products/' + idMealProduct, {headers: header})
  }

  changeProductAmount(token: string, idMealProduct: number, productAmount: number) {
    let header = new HttpHeaders().set('auth-token', token);
    return this.http.put(this.apiURL + '/diet/meal-products/' + idMealProduct + '/' + productAmount, {headers: header})
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { newMeal } from 'src/app/models/newMeal.model';
import { MealService } from 'src/app/shared/meal.service';
import { DateService } from 'src/app/shared/dateService.service';
import { NutritionsService } from 'src/app/shared/nutritions.service';
import { ProductsService } from 'src/app/shared/products.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Nutrition } from 'src/app/models/nutritions.model';
import { product } from 'src/app/models/product.model';
import { newProduct } from 'src/app/models/newProduct.model';
//import { join } from 'path';

@Component({
  selector: 'app-diet-view',
  templateUrl: './diet-view.component.html',
  styles: []
})

export class DietViewComponent implements OnInit {
  newMeal: newMeal;
  dayNutritions: Nutrition;
  userNutritions: Nutrition;
  mealsNutritions: any = [];
  mealsProducts: any = [];
  isNewMealError: boolean = false;
  isDeletedMealError: boolean = false;
  meals: any = [];
  dayProgress: Nutrition = {
    calories: 0,
    carbohydrates_grams: 0,
    fat_grams: 0,
    protein_grams: 0,
  }

 //adding product to meal
  products: any = [];
  chosenMealId;
  searchingPattern;

  //adding custom product
  customProduct: product;


  constructor(private mealService: MealService, private productsService: ProductsService, private nutritionsService: NutritionsService, private router: Router, private dateService: DateService) { }

  ngOnInit() {
    this.resetForm();
    this.resetMeal();
    this.resetCustomProduct();
    this.resetDayNutritions();
    this.resetUserNutritions();
    this.resetCustomProduct();
    this.loadMealsNutritions();
    this.loadMealsProducts();
    this.loadMeals();
    this.loadDayNutritions();
    this.loadMealsNutritions();
    this.loadProducts();
  }

  OnSubmit(form: NgForm) {
    this.mealService.addMeal(localStorage.getItem('userToken'), form.value).subscribe((data: any) => {
        this.router.navigate(['/']);
    },
    (err: HttpErrorResponse) => {
        this.isNewMealError = true;
    });
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
  }

  resetMeal() {
    this.newMeal = {
      date:	    this.dateService.getFormattedDate(), 
      name:	    "",
      time:	    "",
    }
  }


  resetDayNutritions() {
    this.dayNutritions = {
      calories: 0,
      carbohydrates_grams: 0,
      fat_grams: 0,
      protein_grams: 0,
    }
  }

  resetUserNutritions() {
    this.userNutritions = {
      calories: 0,
      carbohydrates_grams: 0,
      fat_grams: 0,
      protein_grams: 0,
    }
  }

  
  resetCustomProduct(){
    this.customProduct = {
      id_product: 0,
      name: "",
      producer: "",
      calories:	0,
      fat_grams:	0,
      carbohydrates_grams:	0,
      protein_grams:	0,
    }
  }

  loadMeals() {
    return this.mealService.getMeals(localStorage.getItem('userToken'), this.dateService.getFormattedDate()).subscribe((data: {}) => {
      this.meals = data;
      console.log(JSON.stringify(this.meals));
    })
  }

  loadDayNutritions() {
    return this.nutritionsService.getNutritionsForDay(localStorage.getItem('userToken'), this.dateService.getFormattedDate()).subscribe((data: {}) => {
      this.dayNutritions = {
        calories: this.round(data["calories"], 2),
        carbohydrates_grams: this.round(data["carbohydrates_grams"], 2),
        fat_grams: this.round(data["fat_grams"], 2),
        protein_grams: this.round(data["protein_grams"], 2),
      }
      // console.log(JSON.stringify(this.dayNutritions));
      this.loadUserNutritions();
    })
  }

  loadUserNutritions() {
    return this.nutritionsService.getNutritionsForUser(localStorage.getItem('userToken'), this.dateService.getFormattedDate()).subscribe((data: {}) => {
      this.userNutritions = {
        calories: this.round(data["calories"], 2),
        carbohydrates_grams: this.round(data["carbohydrates_grams"], 2),
        fat_grams: this.round(data["fat_grams"], 2),
        protein_grams: this.round(data["protein_grams"], 2),
      }
      // console.log(JSON.stringify(this.userNutritions));
      this.loadDayProgress();
    })
  }

  loadMealsNutritions() {
    return this.nutritionsService.getNutritionsForMeals(localStorage.getItem('userToken'), this.dateService.getFormattedDate()).subscribe((data: {}) => {
      this.mealsNutritions = data;
      console.log(JSON.stringify(this.mealsNutritions));
    })
  }

  loadMealsProducts() {
    return this.productsService.getMealsProducts(localStorage.getItem('userToken'), this.dateService.getFormattedDate()).subscribe((data: {}) => {
      this.mealsProducts = data;
      console.log(JSON.stringify(this.mealsProducts));
    })
  }

  loadProducts() {
    return this.productsService.getProducts(localStorage.getItem('userToken')).subscribe((data: {}) => {
      this.products = data;
      console.log(JSON.stringify(this.products));
    });
  }

  loadProductsByPattern(){
    if (typeof this.searchingPattern === 'undefined') {
      this.loadProducts();
    } else {
      return this.productsService.getProductsByPattern(localStorage.getItem('userToken'), this.searchingPattern).subscribe((data: {}) => {
        this.products = data;
        console.log(JSON.stringify(this.products));
      });
    }
  }

  addProductToMeal(idMeal: number, idProduct: number, quantity: number){
    this.productsService.addMealProduct(localStorage.getItem('userToken'), idMeal, idProduct, quantity).subscribe((data: any) => {
      this.router.navigate(['/']); 
  });   
  }


  loadDayProgress() {
    this.dayProgress = {
      calories: this.round(this.dayNutritions.calories*100/this.userNutritions.calories, 2),
      carbohydrates_grams: this.round(this.dayNutritions.carbohydrates_grams*100/this.userNutritions.carbohydrates_grams, 2),
      fat_grams: this.round(this.dayNutritions.fat_grams*100/this.userNutritions.fat_grams, 2),
      protein_grams: this.round(this.dayNutritions.protein_grams*100/this.userNutritions.protein_grams, 2),
    }
    // console.log(JSON.stringify(this.dayProgress));
  }

  deleteMeal(idMeal: number){
    this.mealService.deleteMeal(localStorage.getItem('userToken'), idMeal).subscribe((data: any) => {
        this.router.navigate(['/']); 
    },
    (err: HttpErrorResponse) => {
        this.isDeletedMealError = true;
    });
  }

  
  addCustomProduct(){
    /*
    const productBody: product = {
      id_product: 0,
      name: this.customProduct.name,
      producer:	this.customProduct.producer,
      calories: this.customProduct.calories,
      fat_grams: this.customProduct.fat_grams,
      carbohydrates_grams: this.customProduct.carbohydrates_grams,
      protein_grams: this.customProduct.protein_grams,
    };
    */

    this.productsService.addProduct(localStorage.getItem('userToken'), this.customProduct).subscribe((data: any) => {
      console.log(data); 
    });
    
    this.resetCustomProduct();
  }

  deleteProduct(idMealProduct: number){
    this.productsService.deleteMealProduct(localStorage.getItem('userToken'), idMealProduct).subscribe((data: any) => {
        this.router.navigate(['/']); 
    },
    (err: HttpErrorResponse) => {
        this.isDeletedMealError = true;
    });
  }

  getNutritionsForMeal(id_meal: number) {
    var nutritions = this.mealsNutritions.filter(function(nutrition) {
      return nutrition.id_meal === id_meal;
    })[0];
    if(nutritions != undefined){
      return this.round(nutritions.calories, 2) + "kcal " + this.round(nutritions.protein_grams, 2) + "g " 
            + this.round(nutritions.fat_grams, 2) + "g " + this.round(nutritions.carbohydrates_grams, 2) + "g";
    }else {
      return "0kcal 0g 0g 0g";
    }
  }

  getNutritionsForProduct(id_meal_product: number) {
    var nutritions = this.mealsProducts.filter(function(nutrition) {
      return nutrition.id_meal_product === id_meal_product;
    })[0];
    if(nutritions != undefined){
      return this.round(nutritions.calories, 2) + "kcal " + this.round(nutritions.protein_grams, 2) + "g " 
            + this.round(nutritions.fat_grams, 2) + "g " + this.round(nutritions.carbohydrates_grams, 2) + "g";
    }else {
      return "0kcal 0g 0g 0g";
    }
  }

  productsInMeal(id_meal: number){
    var products = this.mealsProducts.filter(function(product) {
      return product.id_meal === id_meal;
    });
    return products;
  }

  nextDay(){
    this.dateService.nextDay();
    this.resetMeal();
    this.loadMeals();
    this.resetCustomProduct();


    
    this.resetForm();
    this.resetDayNutritions();
    this.resetUserNutritions();
    this.resetCustomProduct();
    this.loadMealsNutritions();
    this.loadMealsProducts();
    this.loadDayNutritions();
    this.loadMealsNutritions();
    this.loadProducts();
  }

  previousDay(){
    this.dateService.previousDay();
    this.resetMeal();
    this.loadMeals();
    this.resetCustomProduct();


    
    this.resetForm();
    this.resetDayNutritions();
    this.resetUserNutritions();
    this.resetCustomProduct();
    this.loadMealsNutritions();
    this.loadMealsProducts();
    this.loadDayNutritions();
    this.loadMealsNutritions();
    this.loadProducts();
  }
  
  round(x: number, n: number) {
    return parseFloat(x.toFixed(n));
  }
}

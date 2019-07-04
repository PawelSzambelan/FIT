import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//dateService singleton service stores selected date (current date by default), and provides methods for change it
export class DateService {

  selectedDate:Date;
  
  dd:string;
  mm:string;
  yyyy:string;

 constructor() { 
   this.selectedDate = new Date();
 }

 getFormattedDate(){
  this.dd = this.selectedDate.getDate().toString();
  this.mm = (this.selectedDate.getMonth()+1).toString();
  this.yyyy = this.selectedDate.getFullYear().toString();

  if (this.dd.length == 1) {
    this.dd="0"+this.dd
  }
  if (this.mm.length == 1) {
    this.mm="0"+this.mm
  }

  return this.dd +"-"+this.mm+"-"+this.yyyy;
 }

 nextDay(){
  this.selectedDate.setDate(this.selectedDate.getDate()+1)
 }
 previousDay(){
   this.selectedDate.setDate(this.selectedDate.getDate()-1)
 }
}

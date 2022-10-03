import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { FoodItem } from '../models/food-item.model';


@Injectable({
  providedIn: 'root'
})
export class FoodItemServiceService {

  allFoodItemsobserver = new BehaviorSubject<FoodItem[]>([]);
  foodItemRS = new ReplaySubject<FoodItem>(1);
  cartItems = new BehaviorSubject<FoodItem[]>([]);  
 

  public subscriber$  =  this.allFoodItemsobserver.asObservable();
  public subscriber2$ =  this.foodItemRS.asObservable();
  public subscriber3$ =  this.cartItems.asObservable();

  constructor(public http:HttpClient) { }

  emitData(data:FoodItem[]) {
    this.allFoodItemsobserver.next(data);
  }

  emitCartDataForCheckout(data:FoodItem[]) 
  {
   
    this.cartItems.next(data);
  }

  emitFoodItemForUpdate(data:FoodItem) 
  {
    this.foodItemRS.next(data);
  }

  loadAllFoodItems(): Observable<FoodItem[]> 
  {
    return this.http.get<FoodItem[]>("http://localhost:9999/kitchenstory/findAll");
  }

  storeFoodItem(foodItem:any):Observable<string>{
    return this.http.post("http://localhost:9999/kitchenstory/storefood",foodItem,{responseType:'text'});
  }

  deleteFoodItem(id:string):Observable<string> {
    return this.http.delete("http://localhost:9999/kitchenstory/deletefood/"+id,{responseType:"text"});
  }

  updateFoodItemDetails(foodItem:any):Observable<string>{
    return this.http.put("http://localhost:9999/kitchenstory/updatefood",foodItem,{responseType:'text'});
  }

}

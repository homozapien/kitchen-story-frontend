import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodOrderService {

  constructor(public http:HttpClient) { }

  createPurchaseOrder(order:any):Observable<string>
  {
    return this.http.post("http://localhost:9999/kitchenstory/createpo",order,{responseType:'text'});
  }

  updateOrderPaymentStatus(order:any):Observable<string> 
  { 
    return this.http.put("http://localhost:9999/kitchenstory/updatepymntstatus", order, {responseType:"text"});
  }

}

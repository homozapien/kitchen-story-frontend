import { Component, OnInit } from '@angular/core';
import { FoodItem } from 'src/app/models/food-item.model';
import { FoodItemServiceService } from 'src/app/services/food-item-service.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {

  constructor(private fis:FoodItemServiceService) { 
  
  }

  foodItems: Array<FoodItem> = [];

  ngOnInit(): void 
  { 
    this.fis.subscriber$.subscribe(data=>this.foodItems=data);
    this.loadAllFoodItems();
  }

   
  loadAllFoodItems():void
  {
    this.fis.loadAllFoodItems().subscribe(data=>this.foodItems=data,error=>console.log(error),()=> {
     }
   )
  }

  deleteFoodItemById(id:string):void{
   
    this.fis.deleteFoodItem(id)
        .subscribe(result=>console.log(result), error=>console.log(error), ()=>{
          this.loadAllFoodItems();
          console.log("Delete API was called....");
        });

  }

  updateFoodItemDetails(fooditem: FoodItem)
  {
    this.fis.emitFoodItemForUpdate(fooditem);
  }

  

}

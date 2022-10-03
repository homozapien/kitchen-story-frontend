import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FoodItem } from 'src/app/models/food-item.model';
import { FoodItemServiceService } from 'src/app/services/food-item-service.service';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit {

  constructor(private fis: FoodItemServiceService) { }

  foodItem!: FoodItem;

  foodItems: Array<FoodItem> = [
    //  new Ingredient("100", "Vegetables", "https://cdn.pixabay.com/photo/2015/10/26/07/21/vegetables-1006694_960_720.jpg", 20),
    //  new Ingredient("101", "Brown Egg", "http://cdn.pixabay.com/photo/2015/09/17/17/19/eggs-944495_960_720.jpg", 20)
    //Butter: https://cdn.pixabay.com/photo/2016/06/11/04/09/butter-1449453_960_720.jpg
  ];


  ngOnInit(): void {
    this.fis.subscriber2$.subscribe(data => {
      this.foodItem = data
      this.foodItemForm.get("id")?.setValue(this.foodItem.id);
      this.foodItemForm.get("name")?.setValue(this.foodItem.name);
      this.foodItemForm.get("type")?.setValue(this.foodItem.type);
      this.foodItemForm.get("price")?.setValue(this.foodItem.price.toString());
      this.foodItemForm.get("imagepath")?.setValue(this.foodItem.imagepath);
      this.buttonName = "Update";
    },
      error => console.log(error),
      () => {
        console.log("subscription completed according")
      });
  }

  storeMsg?: string;

  buttonName: string = "Add";

  foodItemForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    imagepath: new FormControl('', Validators.required)
  });


  loadAllFoodItems(): void {
    this.fis.loadAllFoodItems().subscribe(data => this.foodItems = data, error => console.log(error), () => {
      this.fis.emitData(this.foodItems);
    }
    )
  }

  createFoodItem(): void {
    let foodItem = this.foodItemForm.value;
    console.log(foodItem);
    this.fis.storeFoodItem(foodItem)
      .subscribe(result => this.storeMsg = result, error => this.storeMsg = error, () => {
        this.loadAllFoodItems();
        console.log("Store fooditem completed ........" + this.storeMsg);
      });
  }

  ngOnDestroy() {

  }

}

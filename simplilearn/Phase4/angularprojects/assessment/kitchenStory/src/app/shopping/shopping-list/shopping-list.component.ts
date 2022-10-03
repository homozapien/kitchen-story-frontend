import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FoodItem } from 'src/app/models/food-item.model';
import { FoodItemServiceService } from 'src/app/services/food-item-service.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  constructor(private fis: FoodItemServiceService,
    private router: Router, private route: ActivatedRoute) {
  }

  foodFilter: string = '';
  
  foodItems: Array<FoodItem> = [];
  cartItems: Array<FoodItem> = [];

  ngOnInit(): void {
    this.fis.subscriber$.subscribe(data => this.foodItems = data);
    this.loadAllFoodItems();
  }

  loadAllFoodItems(): void {
    this.fis.loadAllFoodItems().subscribe(data => this.foodItems = data, error => console.log(error), () => {
    }
    )
  }

  addToCart(event: Event, fooditem: FoodItem) {
    let isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked && !this.cartItems.some(element => element.id === fooditem.id)) {
      this.cartItems.push(fooditem);
    }
    else if (!isChecked && this.cartItems.some(element => element.id === fooditem.id)) {
     
      const index = this.cartItems.findIndex(x => x.id === fooditem.id);

      if (index > -1) {
        this.cartItems.splice(index, 1);
      }
    }

  /*  this.cartItems.forEach(element => {
      console.log(element);
    }); */

  }

  checkOutCartItems(): void 
  {
   this.fis.emitCartDataForCheckout(this.cartItems);
   this.router.navigate(['shopping/checkout']);
  
  }

}

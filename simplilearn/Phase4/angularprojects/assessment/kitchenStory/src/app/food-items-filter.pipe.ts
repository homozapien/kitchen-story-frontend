import { Pipe, PipeTransform } from '@angular/core';
import { FoodItem } from './models/food-item.model';

@Pipe({
  name: 'foodItemsFilter'
})
export class FoodItemsFilterPipe implements PipeTransform {

  transform(list: FoodItem[], value: string) 
  {
    return value ? list.filter(foodItem => foodItem.type === value) : list;
  }

}
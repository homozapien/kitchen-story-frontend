import { FoodItem } from "./food-item.model";

export class PurchaseOrder 
{
    constructor(public orderid:string | undefined, public orderBy:string | null, public foodItems:FoodItem[] | undefined, 
        public orderTotalPrice:number | undefined
       ) 
    {	
	}
}

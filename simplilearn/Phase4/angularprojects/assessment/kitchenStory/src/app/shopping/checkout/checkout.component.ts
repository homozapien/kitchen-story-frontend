import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodItem } from 'src/app/models/food-item.model';
import { PurchaseOrder } from 'src/app/models/purchase-order.model';
import { FoodItemServiceService } from 'src/app/services/food-item-service.service';
import { FoodOrderService } from 'src/app/services/food-order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor( private route: ActivatedRoute,
               private fis:FoodItemServiceService,
               private fos:FoodOrderService) { 
   
  }

  showOrderCreated:boolean = false;
  showPmntComplete:boolean = false;
  isOrderCreated:boolean = false;
  isPaymentComplete:boolean = true;
  
  totalCartItemPrice: number = 0.0;
  readonly taxRate:number = 0.085; 
  taxAmount: number = 0;
  orderTotal: number = 0;
  orderBy!:string | null;
  apiCallResponse:string  = 'EXCEPTION';
  apiPymntResponse:string = 'EXCEPTION';
  cartItems: Array<FoodItem> = [];
  purchaseOrder!:PurchaseOrder;

  ngOnInit(): void 
  {
    this.fis.subscriber3$.subscribe(data => {
     this.cartItems = data;  
     this.calculateTotalPrieAndTax();
    });
  }

  calculateTotalPrieAndTax() 
  {
    this.totalCartItemPrice = 0;

    this.cartItems.forEach(element => {
      this.totalCartItemPrice += element.price;
    }); 

    this.taxAmount = parseFloat((this.totalCartItemPrice * this.taxRate).toFixed(2));

    this.orderTotal = parseFloat((this.taxAmount  + this.totalCartItemPrice).toFixed(2));
   
    this.totalCartItemPrice = parseFloat(this.totalCartItemPrice.toFixed(2));

  }

  createOrder():void
  {
   // this.isOrderCreated = true;
    this.showOrderCreated = false;
    this.showPmntComplete = false;

    this.apiCallResponse = 'EXCEPTION';

    this.orderBy = sessionStorage.getItem("user");
    //(String orderid, String orderBy, FoodItem[] foodItems,  double orderTotalPrice, String paymentStatus)
    this.purchaseOrder = new PurchaseOrder(undefined, this.orderBy, this.cartItems, this.orderTotal); 
   
    this.fos.createPurchaseOrder(this.purchaseOrder)
    .subscribe(result => this.apiCallResponse = result, error => this.apiCallResponse = error, () => {
      this.resetProperties();
      console.log("Purchase Order was created successfully, orderId ........" + this.apiCallResponse);
    });
  
  }

  makePayment():void
  {
    this.apiPymntResponse = 'EXCEPTION';
    this.isPaymentComplete = true;
    
    this.purchaseOrder.orderid = this.apiCallResponse;


    this.fos.updateOrderPaymentStatus(this.purchaseOrder)
    .subscribe(
              result => 
                 {     
                     console.log("ddddd")
                     this.apiPymntResponse = result;
                     console.log("Make payment result is " + result);
                 },
      
          error => console.log('>>>> Error oops >>>>> ', error.message),

       () => {
        this.resetProperties();
        console.log("Purchase Order payment was successfull, orderId ........" + this.apiPymntResponse);
    });

  }

  resetProperties():void{
     if(this.apiCallResponse !== 'EXCEPTION')
     {
        this.isOrderCreated = true; 
        this.showOrderCreated = true;
        this.showPmntComplete = false;
        this.isPaymentComplete = false;   
     }

     if(this.apiPymntResponse !== 'EXCEPTION') //if payment is good
     {
       
        this.isPaymentComplete = true;     //flip to show message
        this.showOrderCreated = false;
        this.showPmntComplete = true;
     }
  }

  removeFromCart(foodItem:FoodItem) :void
  {
    const index = this.cartItems.findIndex(x => x.id === foodItem.id);

    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    this.calculateTotalPrieAndTax();
  }

}

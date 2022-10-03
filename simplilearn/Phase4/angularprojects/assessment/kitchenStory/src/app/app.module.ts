import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './top_bottom/header/header.component';
import { FooterComponent } from './top_bottom/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FoodComponent } from './food/food.component';
import { FoodListComponent } from './food/food-list/food-list.component';
import { FoodItemComponent } from './food/food-item/food-item.component';
import { AuthenticationInterceptor } from './guards/authentication.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingComponent } from './shopping/shopping.component';
import { FoodItemsFilterPipe } from './food-items-filter.pipe';
import { CheckoutComponent } from './shopping/checkout/checkout.component';
import { PaymentComponent } from './shopping/payment/payment.component';
import { ConfirmationComponent } from './shopping/payment/confirmation/confirmation.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FoodComponent,
    FoodListComponent,
    FoodItemComponent,
    ShoppingComponent,
    FoodItemsFilterPipe,
    CheckoutComponent,
    PaymentComponent,
    ConfirmationComponent,
    ShoppingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }

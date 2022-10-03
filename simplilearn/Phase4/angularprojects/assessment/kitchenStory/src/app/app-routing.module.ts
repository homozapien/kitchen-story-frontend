import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodComponent } from './food/food.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { CheckoutComponent } from './shopping/checkout/checkout.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { ShoppingComponent } from './shopping/shopping.component';

const routes: Routes = [
  {
    path: "login", loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    //canActivate: [AuthenticationGuard]
  },

  {
    path: "food", component: FoodComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "shopping", component: ShoppingComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: "buylist", component: ShoppingListComponent,
       // canActivateChild: [AuthenticationGuard]
      },
      {
        path: "checkout", component: CheckoutComponent,
       // canActivateChild: [AuthenticationGuard]
      },
      {
        path: "**", redirectTo: 'buylist',
       // canActivateChild: [AuthenticationGuard]
      },
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

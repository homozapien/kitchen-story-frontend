import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchmgmtComponent } from './admin/branchmgmt/branchmgmt.component';
import { OperationmgmtComponent } from './admin/operationmgmt/operationmgmt.component';
import { AccountOpeningMgmtComponent } from './admin/requestmgmt/account-opening-mgmt/account-opening-mgmt.component';
import { CheckBookMgmtComponent } from './admin/requestmgmt/check-book-mgmt/check-book-mgmt.component';
import { CustomerProfileMgmtComponent } from './admin/requestmgmt/customer-profile-mgmt/customer-profile-mgmt.component';
import { CustomerComponent } from './customer/customer.component';
import { ProfileSetupComponent } from './customer/profile-setup/profile-setup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthenticationGuard } from './services/auth/authentication.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'logout', component: LogoutComponent //
  },
  { path: 'createProfile', component: ProfileSetupComponent },
  {
    path: 'custProfileReqMgmt', component: CustomerProfileMgmtComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'checkBookReqMgmt', component: CheckBookMgmtComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'acctOpenReqMgmt', component: AccountOpeningMgmtComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'branchMgmt', component: BranchmgmtComponent,   
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'operationMgmt', component: OperationmgmtComponent,  
    canActivate: [AuthenticationGuard]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

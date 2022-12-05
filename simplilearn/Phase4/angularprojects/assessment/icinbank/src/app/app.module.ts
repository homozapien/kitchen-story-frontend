import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { HeaderComponent } from './head_foot/header/header.component';
import { FooterComponent } from './head_foot/footer/footer.component';
import { BranchmgmtComponent } from './admin/branchmgmt/branchmgmt.component';
import { BranchListComponent } from './admin/branchmgmt/branch-list/branch-list.component';
import { BranchComponent } from './admin/branchmgmt/branch/branch.component';
import { OperationmgmtComponent } from './admin/operationmgmt/operationmgmt.component';
import { OperationListComponent } from './admin/operationmgmt/operation-list/operation-list.component';
import { OperationComponent } from './admin/operationmgmt/operation/operation.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { ProfileSetupComponent } from './customer/profile-setup/profile-setup.component';
import { AccountOpeningMgmtComponent } from './admin/requestmgmt/account-opening-mgmt/account-opening-mgmt.component';
import { CheckBookMgmtComponent } from './admin/requestmgmt/check-book-mgmt/check-book-mgmt.component';
import { CustomerProfileMgmtComponent } from './admin/requestmgmt/customer-profile-mgmt/customer-profile-mgmt.component';
import { authInterceptorProviders } from './services/auth/authentication.interceptor';
import { CustProfileDetailComponent } from './admin/requestmgmt/customer-profile-mgmt/cust-profile-detail/cust-profile-detail.component';
import { CustProfileListComponent } from './admin/requestmgmt/customer-profile-mgmt/cust-profile-list/cust-profile-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    HeaderComponent,
    FooterComponent,
    BranchmgmtComponent,
    BranchListComponent,
    BranchComponent,
    OperationmgmtComponent,
    OperationListComponent,
    OperationComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    ProfileSetupComponent,
    AccountOpeningMgmtComponent,
    CheckBookMgmtComponent,
    CustomerProfileMgmtComponent,
    CustProfileListComponent,
    CustProfileDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

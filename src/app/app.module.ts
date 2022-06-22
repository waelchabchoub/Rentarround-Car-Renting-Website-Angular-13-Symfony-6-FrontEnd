import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SigninComponent } from './member/signin/signin.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ROUTING } from './app.routing';
import { HomeComponent } from './blog/home/home.component';
import { SignupComponent } from './member/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { CarsComponent } from './blog/admin/cars/add-cars/add-cars.component';
import { LoginGuard } from './guard/login.guard';
import { AdminGuard } from './guard/admin.guard';
import { LoginInterceptorProvider } from './interceptors/LoginInterceptor';
import { ReservationComponent } from './blog/reservation/reservation.component';
import { ErrorComponent } from './error/error.component';
import { UsersComponent } from './blog/admin/users/users/users.component';
import { ListUsersComponent } from './blog/admin/users/list-users/list-users.component';
import { ItemUserComponent } from './blog/admin/users/item-user/item-user.component';
import { DetailUserComponent } from './blog/admin/users/detail-user/detail-user.component';
import { AddAdminComponent } from './blog/admin/add-admin/add-admin.component';
import { AdminsComponent } from './blog/admin/admins/admins/admins.component';
import { DetailAdminComponent } from './blog/admin/admins/detail-admin/detail-admin.component';
import { ItemAdminComponent } from './blog/admin/admins/item-admin/item-admin.component';
import { ListAdminsComponent } from './blog/admin/admins/list-admins/list-admins.component';
import { AccountComponent } from './blog/account/account/account.component';
import { EditAccountComponent } from './blog/account/edit-account/edit-account.component';
import { ContractComponent } from './blog/account/contract/contract.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    HomeComponent,
    SignupComponent,
    CarsComponent,
    ReservationComponent,
    ErrorComponent,
    UsersComponent,
    ListUsersComponent,
    ItemUserComponent,
    DetailUserComponent,
    AddAdminComponent,
    AdminsComponent,
    DetailAdminComponent,
    ItemAdminComponent,
    ListAdminsComponent,
    AccountComponent,
    EditAccountComponent,
    ContractComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    ROUTING,
    HttpClientModule,
    
  ],
  providers: [
    LoginGuard,
    AdminGuard,
    LoginInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

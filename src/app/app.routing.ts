import { Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./blog/account/account/account.component";
import { ContractComponent } from "./blog/account/contract/contract.component";
import { EditAccountComponent } from "./blog/account/edit-account/edit-account.component";
import { AddAdminComponent } from "./blog/admin/add-admin/add-admin.component";
import { AdminsComponent } from "./blog/admin/admins/admins/admins.component";
import { CarsComponent } from "./blog/admin/cars/add-cars/add-cars.component";
import { UsersComponent } from "./blog/admin/users/users/users.component";
import { HomeComponent } from "./blog/home/home.component";
import { ReservationComponent } from "./blog/reservation/reservation.component";
import { ErrorComponent } from "./error/error.component";
import { AdminGuard } from "./guard/admin.guard";
import { LoginGuard } from "./guard/login.guard";
import { SigninComponent } from "./member/signin/signin.component";
import { SignupComponent } from "./member/signup/signup.component";

const APP_ROUTING : Routes = [
    {path:'blog',children:[
        {path:'',component:HomeComponent},
        {path:'reservation/:id',component:ReservationComponent},
        {path:'account',canActivate:[LoginGuard],children:[
            {path:'',component:AccountComponent},
            {path:'edit_account/:id',component:EditAccountComponent},
            {path:'contract/:id',component:ContractComponent},
        ]},
        {path:'admin',canActivate:[AdminGuard],children:[
            {path:'cars',component:CarsComponent}, 
            {path:'users',component:UsersComponent},
            {path:'add_admin',component:AddAdminComponent},
            {path:'admins',component:AdminsComponent},
        ]}
    ]},
    {path:'member',children:[
        {path:'signin',component:SigninComponent},
        {path:'signup',component:SignupComponent},
    ]},
    {path:'',redirectTo:'blog',pathMatch:'full'},
    {path:'**',component:ErrorComponent},
    
];
export const ROUTING = RouterModule.forRoot(APP_ROUTING);
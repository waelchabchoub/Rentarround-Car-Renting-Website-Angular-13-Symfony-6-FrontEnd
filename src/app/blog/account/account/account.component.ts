import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { AuthentificationService } from 'src/app/authentification.service';
import { BlogService } from 'src/app/blog.service';
import { Reservation } from 'src/app/model/Reservation';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  
  user:User = new User();
  reservations:Reservation[] = [];
  allReservations: Reservation[] = [];

  constructor(private userService:UserService,private blogService:BlogService,public authentificationService:AuthentificationService, private router:Router) { }

  ngOnInit(): void {
    //get the user id from the local storage
      const token = localStorage.getItem('token');
      const tokenInfo = this.getDecodedAccessToken(token!); // decode token
      //get the current user
      this.userService.getUser(tokenInfo.user_id).subscribe(
        (user)=>{
          this.user=user;
        }
      );
      this.blogService.getUserReservations(tokenInfo.user_id).subscribe(
        (reservations)=>{
          this.reservations= reservations;
         }
      );
      //get all the reservations
      this.blogService.getReservations().subscribe(
        (reservations)=>{
          this.allReservations=reservations;
        }
      )
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  acceptReservation(adminReservation:any){
    
    adminReservation.status = "accepted";
    
    this.blogService.updateReservation(adminReservation.id,adminReservation).subscribe(
      (reservation)=>{
          //update car availability
          adminReservation.vehicle.availability=false ;
          this.blogService.updateCarAvailability(adminReservation.vehicle.id,adminReservation.vehicle).subscribe(
            (response)=>{

            }
          );
      }
    );
   
}
denyReservation(adminReservation:any){
  adminReservation.status = "denied";
    this.blogService.updateReservation(adminReservation.id,adminReservation).subscribe(
      (reservation)=>{
           
      }
    );
    
}
  click(carId:any){
    this.router.navigate(['blog/account/contract',carId]);
  }
}

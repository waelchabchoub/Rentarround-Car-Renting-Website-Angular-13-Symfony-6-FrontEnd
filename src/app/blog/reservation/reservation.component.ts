import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/blog.service';
import { Car } from 'src/app/model/Car';
import { Reservation } from 'src/app/model/Reservation';
import jwt_decode from 'jwt-decode';
import { AuthentificationService } from 'src/app/authentification.service';
import { formatDate } from '@angular/common';
import { Comment } from 'src/app/model/Comment';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/model/User';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  car = new Car();
  comments: Comment[] = [];
  reservation = new Reservation();
  errorMessage='';
  totalPrice =0;
  currentPage = 1;
  numberOfCommentsInNextPage!:number;

  constructor(private activatedRoute:ActivatedRoute,private blogService:BlogService,public authentificationService:AuthentificationService,public userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params)=>{
          this.blogService.getCar(params['id']).subscribe(
            (car)=>{
              this.car=car;
              this.blogService.getCarComments(params['id'],this.currentPage).subscribe(
                (comments)=>{
                  this.comments = comments;
                  this.checkNumberOfCommentsInNextPage();
                 
                }
              );
            }
          );
      }
    );
  }
  price(d:any,f:any){
    const startDate = new Date(d._inputValue);
    const endDate = new Date(f._inputValue);
    
    if(startDate > endDate){
      this.errorMessage ="End Date is Superior than the Start Date";
      this.totalPrice=0;
    }
    else{
      this.errorMessage='';
      const timeDiff=endDate.getTime() - startDate.getTime();
      const dayDiff=timeDiff/(1000*24*3600);
      this.totalPrice = dayDiff * this.car.pricePerDay;
      
    }
    
 }
 rent(formulaire:any,d:any,f:any){
   
   
  //get the current user
   const token = localStorage.getItem('token');
   const tokenInfo = this.getDecodedAccessToken(token!); 

    //reformulation de la requete
    formulaire.value['startDate']=d._inputValue;
    formulaire.value['endDate']=f._inputValue;
    formulaire.value['totalPrice'] = this.totalPrice;
    formulaire.value['status'] = 'pending';
    formulaire.value['user']= 'api/users/'+tokenInfo.user_id;
    formulaire.value['vehicle']= 'api/vehicles/'+this.car.id;
    

    //post the reservation
    this.blogService.addReservation(formulaire.value).subscribe(
      (response)=>{
        this.router.navigate(['/blog']);
      },
      
    );
    
 }
 getDecodedAccessToken(token: string): any {
  try {
    return jwt_decode(token);
  } catch(Error) {
    return null;
  }
}

//remove The car
removeCar(id:any){
  this.blogService.removeCar(id).subscribe(
    (response)=>{
      this.router.navigate(['/blog']);
    }
  )
}


//comment section
comment(formulaire:any){
   //get the current user
   const token = localStorage.getItem('token');
   const tokenInfo = this.getDecodedAccessToken(token!); 

   //reformulation de la requete
    formulaire.value['createdAt']=  formatDate(new Date(),'yyyy-MM-dd','en');
    formulaire.value['user']= 'api/users/'+tokenInfo.user_id;
    formulaire.value['vehicle']= 'api/vehicles/'+this.car.id;
   
    this.blogService.addComment(formulaire.value).subscribe(
      (response)=>{
        location.reload();
      },
      
    );
}
checkNumberOfCommentsInNextPage(){
  this.blogService.getCarComments(this.car.id,this.currentPage+1).subscribe(
    (comments)=>{
      this.numberOfCommentsInNextPage=comments.length;
    }
  );
}

next(){
  this.currentPage += 1;
  this.blogService.getCarComments(this.car.id,this.currentPage).subscribe(
    (comments)=>{
      this.comments=comments;
      this.checkNumberOfCommentsInNextPage();
    }
  );
}

previous(){
  this.currentPage -= 1;
  this.blogService.getCarComments(this.car.id,this.currentPage).subscribe(
    (comments)=>{
      this.comments=comments;
      this.checkNumberOfCommentsInNextPage();
    }
  );
}

}

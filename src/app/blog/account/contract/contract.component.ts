import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/user.service';
import { BlogService } from 'src/app/blog.service';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/model/Reservation';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  user: User = new User();
  reservation: Reservation = new Reservation();
  constructor(private userService:UserService,private blogService:BlogService,private activatedRoute:ActivatedRoute) { }
  @ViewChild('pdfContent',{static:false}) el!:ElementRef;
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
    //get the rented vehicle
    this.activatedRoute.params.subscribe(
      (params)=>{
        this.blogService.getReservation(params['id']).subscribe(
          (reservation)=>{
            this.reservation=reservation;
          }
        )
      }
    );
  }
  makePdf(){
    let pdf=new jsPDF('p','pt','a4');
   
    pdf.setFontSize(2);
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=>{
        pdf.setFontSize(9);
        pdf.save("contract.pdf");
      }
    });
    
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

}

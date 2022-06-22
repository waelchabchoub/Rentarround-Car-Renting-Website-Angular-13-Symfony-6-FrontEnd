import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/authentification.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  errorMessage ='';
  constructor(private authentificationService:AuthentificationService,private router:Router) { }

  ngOnInit(): void {
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  login(credentials:any){

    this.authentificationService.login(credentials).subscribe(
      (response)=>{
        localStorage.setItem('token',response.token);
        const tokenInfo = this.getDecodedAccessToken(response.token); // decode token
        const expireDate = tokenInfo.expire_in; // get token expiration dateTime
        this.authentificationService.autoLogout(expireDate);
        this.router.navigate(['blog']);
      },
      (error)=>{
          this.errorMessage= "Invalid Credentials";
      }
    )
  }

}

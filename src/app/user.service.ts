import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  getUser(id:any):Observable<User>{
    return this.http.get<User>('http://localhost:8000/api/users/'+id);
  }
  getUserName(id:any):String{
    let userName ="";
    this.getUser(id).subscribe(
      (user)=>{
        userName = user.name;
      }
    
    );
    return userName;
  }
  UpdateUser(id:any,user:User):Observable<User>{
    return this.http.put<User>('http://localhost:8000/api/users/'+id,user);
  }
}

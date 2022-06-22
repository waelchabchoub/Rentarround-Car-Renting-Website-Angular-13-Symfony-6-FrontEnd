import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './model/Car';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  //cars
  addCar(Car:Car):Observable<any>{
    return this.http.post('http://localhost:8000/api/vehicles',Car);
  }
  //users
  getUsers(nameFilter:any,surnameFilter:any):Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8000/api/users',{params:{'name':nameFilter,'surname':surnameFilter}});
  }
  deleteUser(id:number){
    return this.http.delete('http://localhost:8000/api/users/'+id);
  }
}

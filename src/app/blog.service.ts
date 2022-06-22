import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './model/Car';
import { Comment } from './model/Comment';
import { Reservation } from './model/Reservation';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }
  // Cars API
  getCars(model:any,region:any,availability:any,page:any):Observable<Car[]>{
    return this.http.get<Car[]>('http://localhost:8000/api/vehicles',{headers:{'accept':'application/json'},params:{'model':model,'region':region,'availability':availability,'page':page}});
  }
  getCar(id:any):Observable<Car>{
    return this.http.get<Car>('http://localhost:8000/api/vehicles/'+id,{headers:{'accept':'application/json'}});
  }
  removeCar(id:number){
    return this.http.delete('http://localhost:8000/api/vehicles/'+id);
  }
  updateCarAvailability(id:number,car:Car){
    return this.http.put('http://localhost:8000/api/vehicles/'+id,car);
  }

  //Reservations Api
  addReservation(reservation:Reservation):Observable<any>{
    return this.http.post('http://localhost:8000/api/reservations',reservation);
  }
  getUserReservations(id:any):Observable<Reservation[]>{
    return this.http.get<Reservation[]>('http://localhost:8000/api/users/'+id+'/reservations');
  }
  getReservations():Observable<Reservation[]>{
    return this.http.get<Reservation[]>('http://localhost:8000/api/reservations');
  }
  updateReservation(id:any,reservation:Reservation):Observable<Reservation>{
    return this.http.put<Reservation>('http://localhost:8000/api/reservations/'+id,reservation);
  }
  getReservation(id:any):Observable<Reservation>{
    return this.http.get<Reservation>('http://localhost:8000/api/reservations/'+id,{headers:{'accept':'application/json'}});
  }

  //Comment Section
  addComment(comment:Comment):Observable<any>{
    return this.http.post('http://localhost:8000/api/comments',comment);
  }
  getCarComments(id:any,page:number):Observable<Comment[]>{
    return this.http.get<Comment[]>('http://localhost:8000/api/vehicles/'+id+'/comments',{headers:{'accept':'application/json'},params:{'page':page}});
  }

}

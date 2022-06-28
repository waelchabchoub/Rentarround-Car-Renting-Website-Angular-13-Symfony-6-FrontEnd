import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/blog.service';
import { AuthentificationService } from 'src/app/authentification.service';
import { Car } from 'src/app/model/Car';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  url = 'https://formsubmit.co/bc8ac3bcf6433697153d606b5866ddea';
  cars:Car[] = [];
  model='';
  region='';
  availability ='';
  currentPage = 1;
  numberOfCarsInNextPage!:number
  constructor(private blogService:BlogService,public authentificationService:AuthentificationService) { }

  ngOnInit(): void {
    this.blogService.getCars(this.model,this.region,this.availability,this.currentPage).subscribe(
      (cars)=>{
        this.cars=cars;
        this.checkNumberOfCarsInNextPage();

      },
    );
  }
  changeAvailability(){
    if(this.availability=='0'){
      this.availability='1';
    }
    else if(this.availability=='1'){
      this.availability = '0';
    }
    else{
      this.availability='1';
    }
  }
  filterCars(modelInput:any,regionInput:any){
    this.currentPage=1;
    this.model=modelInput.value;
    this.region=regionInput.value;
    if(this.availability==''){
      this.availability='0';
      this.blogService.getCars(this.model,this.region,this.availability,this.currentPage).subscribe(
        (cars)=>{
          this.cars=cars;
          this.checkNumberOfCarsInNextPage();
        }
      );
    }
    else{
      this.blogService.getCars(this.model,this.region,this.availability,this.currentPage).subscribe(
        (cars)=>{
          this.cars=cars;
          this.checkNumberOfCarsInNextPage();
        }
      );
    }
  }
  next(){
    this.currentPage += 1;
    this.blogService.getCars(this.model,this.region,this.availability,this.currentPage).subscribe(
      (cars)=>{
        this.cars=cars;
        this.checkNumberOfCarsInNextPage();
      }
    );
  }

  previous(){
    this.currentPage -= 1;
    this.blogService.getCars(this.model,this.region,this.availability,this.currentPage).subscribe(
      (cars)=>{
        this.cars=cars;
        this.checkNumberOfCarsInNextPage();
      }
    );
  }

  checkNumberOfCarsInNextPage(){
    this.blogService.getCars(this.model,this.region,this.availability,this.currentPage+1).subscribe(
      (cars)=>{
        this.numberOfCarsInNextPage=cars.length;
      }
    );
  }

  updateAvailability(car:Car){
    car.availability=!car.availability;
    this.blogService.updateCarAvailability(car.id,car).subscribe(
      (response)=>{

      }
    );
  }
}

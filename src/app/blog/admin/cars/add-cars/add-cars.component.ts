import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-cars',
  templateUrl: './add-cars.component.html',
  styleUrls: ['./add-cars.component.css']
})
export class CarsComponent implements OnInit {

  imageErrorMessage= '';
  selectedImage!:File;
  availability = false;
  constructor(private adminService:AdminService,private router:Router) { }

  ngOnInit(): void {
  }
  checkImageType($event:any){

    if ($event.target.files && $event.target.files[0]) {
      let file = $event.target.files[0];
      
        if(file.type != "image/jpeg" && file.type != "image/png") {
          this.imageErrorMessage="Type Error Please Insert Valid Image Format";
        }
        else if(file.size >= 8388608){
          this.imageErrorMessage="Image Exceeded 8Mo";
        }
        else{
          this.imageErrorMessage="";
          this.selectedImage = <File>file;
        }
      }
  }
 
addCar(formulaire:NgForm){
  formulaire.value['availability'] = this.availability;
  formulaire.value.image=this.selectedImage.name;
  this.adminService.addCar(formulaire.value).subscribe(
    (response)=>{
      this.router.navigate(['blog']);
    },
    (error)=> {
      console.log(error);
    }
  );
}
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  errorMessage = '';
  equal = false;
  imageErrorMessage= '';
  selectedImage!:File;
  constructor(private authentificationService:AuthentificationService,private router:Router) { }

  ngOnInit(): void {
  }

  checkPassword(pwd:any,repwd:any){
    this.equal = pwd.value==repwd.value;
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
  addUser(formulaire:any){
    formulaire.value.image=this.selectedImage.name;
    formulaire.value['roles'] = ['ROLE_ADMIN'];
    this.authentificationService.addUser(formulaire.value).subscribe(
      (response)=>{
        this.router.navigate(['/blog/']);
      },
      (error)=>{
        this.errorMessage="Email Already Exists";
      }
    ); 
     }
}

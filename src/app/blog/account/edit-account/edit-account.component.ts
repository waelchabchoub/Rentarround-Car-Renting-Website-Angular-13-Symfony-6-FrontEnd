import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/user.service';


@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  user:User = new User();
  errorMessage='';
  equal = false;
  imageErrorMessage= '';
  selectedImage!:File;
  constructor(private userService:UserService, private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    //get the user id from the param
    this.activatedRoute.params.subscribe(
      (params)=>{
           //get the current user
            this.userService.getUser(params['id']).subscribe(
              (user)=>{
                this.user=user;
      }
    );
      }
    );
    
   
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
  update(formulaire:any){
    if(formulaire.value['image']==''){
      delete formulaire.value['image'];
    }
    else if (formulaire.value['image']){
      formulaire.value.image=this.selectedImage.name;
    }
    //update
    
    this.userService.UpdateUser(this.user.id,formulaire.value).subscribe(
      (response)=>{
        alert('success');
        this.router.navigate(['/blog/']);
      },
      (error)=>{
        this.errorMessage = "Email Already Exists !";
      }
    ); 

    }
}

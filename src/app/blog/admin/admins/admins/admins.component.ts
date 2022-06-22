import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  admins!:User[];
  selectedAdmin!:User;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getUsers('','').subscribe(
      (admins)=>{
        //filter users
       this.admins = admins.filter((obj) => {
        return obj.roles.includes('ROLE_ADMIN');
      });
      
    }
    );
  }
  processReq(admin:User){
    this.selectedAdmin=admin;
  }
  filterUsers(nameFilter:any,surnameFilter:any){
 
    this.adminService.getUsers(nameFilter,surnameFilter).subscribe(
      (admins)=>{
        //filter users
        this.admins = admins.filter((obj) => {
          return obj.roles.includes('ROLE_ADMIN');
        });
      }
    )
  }

}

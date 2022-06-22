import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!:User[];
  selectedUser!:User;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getUsers('','').subscribe(
      (users)=>{
        //filter users
       this.users = users.filter((obj) => {
        return !obj.roles.includes('ROLE_ADMIN');
      });
      
    }
    );
  }
  processReq(user:User){
    this.selectedUser=user;
  }
  filterUsers(nameFilter:any,surnameFilter:any){
 
    this.adminService.getUsers(nameFilter,surnameFilter).subscribe(
      (users)=>{
        //filter users
        this.users = users.filter((obj) => {
          return !obj.roles.includes('ROLE_ADMIN');
        });
      }
    )
  }
}


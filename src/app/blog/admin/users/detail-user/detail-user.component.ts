import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  @Input() selectedUser!:User;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
  }
  deleteUser(){
    this.adminService.deleteUser(this.selectedUser.id).subscribe(
      (response)=>{
        location.reload();
      }
    );
  }

}

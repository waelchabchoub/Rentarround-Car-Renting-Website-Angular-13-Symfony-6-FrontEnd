import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-detail-admin',
  templateUrl: './detail-admin.component.html',
  styleUrls: ['./detail-admin.component.css']
})
export class DetailAdminComponent implements OnInit {

  @Input() selectedAdmin!:User;
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    
  }
  deleteAdmin(){
    this.adminService.deleteUser(this.selectedAdmin.id).subscribe(
      (response)=>{
        location.reload();
      }
    );
  }


}

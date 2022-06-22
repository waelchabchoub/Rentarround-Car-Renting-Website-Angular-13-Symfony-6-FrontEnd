import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.component.html',
  styleUrls: ['./list-admins.component.css']
})
export class ListAdminsComponent implements OnInit {

  @Input() admins!:User[];
  @Output() selectedAdmin = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  processReq(admin:User){
    this.selectedAdmin.emit(
      admin
    );
  }

}

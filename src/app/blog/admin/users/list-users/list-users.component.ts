import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  @Input() users!:User[];
  @Output() selectedUser = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  processReq(user:User){
    this.selectedUser.emit(
      user
    );
  }

}

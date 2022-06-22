import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/User';


@Component({
  selector: 'app-item-user',
  templateUrl: './item-user.component.html',
  styleUrls: ['./item-user.component.css']
})
export class ItemUserComponent implements OnInit {

  @Input() users!:User[];
  @Output() selectedUser = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  selectUser(user:User){
    this.selectedUser.emit(
      user
    );
  }

}

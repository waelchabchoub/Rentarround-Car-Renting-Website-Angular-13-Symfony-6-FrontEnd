import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-item-admin',
  templateUrl: './item-admin.component.html',
  styleUrls: ['./item-admin.component.css']
})
export class ItemAdminComponent implements OnInit {

  @Input() admins!:User[];
  @Output() selectedAdmin = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  selectAdmin(admin:User){
    this.selectedAdmin.emit(
      admin
    );
  }

}

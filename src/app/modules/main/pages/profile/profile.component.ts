import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private _UsersService: UsersService
  ) { }

  user: any;

  ngOnInit(): void {
    this.getUserById(parseInt(localStorage.getItem('userID')));
  }

  getUserById(id){
    this._UsersService.getUser(id).subscribe(
      (data) => {
        this.user = data;
      }
    )
  }

}

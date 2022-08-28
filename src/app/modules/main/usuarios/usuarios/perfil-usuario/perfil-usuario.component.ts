import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(
    private usersService: UsersService
  ) { }

  userData: any = {};


  ngOnInit(): void {
    this.getUserData(localStorage.getItem("userId"))
  }

  getUserData(id) {
    this.usersService.getDataById(id).subscribe(data => {
      this.userData = data[0];
    })
  }

}

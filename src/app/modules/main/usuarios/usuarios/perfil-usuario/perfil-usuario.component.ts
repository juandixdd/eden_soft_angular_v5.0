import { Component, OnInit } from '@angular/core';
import { UsersService } from 'app/modules/services/users/users.service';
import { UsuarioService } from 'app/modules/services/usuario/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService
  ) { }

  userData: any = {};


  ngOnInit(): void {
    this.getUserData(localStorage.getItem("userId"))
  }

  getUserData(id) {
    this.usuarioService.getDataById(id).subscribe((res: any) => {
      this.userData = res[0];
      console.log(res);

    })
  }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { RolesService } from 'app/modules/services/roles/roles.service';
import { UsersService } from 'app/modules/services/users/users.service';
import { UsuarioService } from 'app/modules/services/usuario/usuario.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
  encapsulation: ViewEncapsulation.None //! Esto es importante para que se muestren bien los estilos, siempre agregar a los componentes.

})
export class ListaUsuariosComponent implements OnInit {

  public ColumnMode = ColumnMode;
  public selectedOption = 10;
  rows: any;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.usuarioService.getData().subscribe(
      (res: any) => {
        console.log(res);
        this.rows = res;

      }
    )
  }

}

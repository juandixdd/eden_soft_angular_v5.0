import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { RolesService } from 'app/modules/services/roles/roles.service';
import { UsuarioService } from 'app/modules/services/usuario/usuario.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  constructor(
    private _coreConfigService: CoreConfigService,
    private usuariosService: UsuarioService,
    private rolesService: RolesService,
    private router: Router
  ) {

    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: false
        },
        menu: {
          hidden: false
        },
        footer: {
          hidden: false
        },
        customizer: true,
        enableLocalStorage: true
      }
    };
  }

  modules = [
    {
      "id": "1",
      "title": "dashboard",
      "type": "item",
      "icon": "activity",
      "url": "main/dashboard"
    },
    {
      "id": "2",
      "title": "Lista de Usuarios",
      "type": "item",
      "icon": "users",
      "url": "main/lista-usuarios"
    },
    {
      "id": "3",
      "title": "Clientes informativos",
      "type": "item",
      "icon": "users",
      "url": "main/cliente"
    },
    {
      "id": "4",
      "title": "Ventas locales",
      "type": "item",
      "icon": "shopping-cart",
      "url": "main/ventas"
    },
    {
      "id": "5",
      "title": "Roles",
      "type": "item",
      "icon": "users",
      "url": "main/roles"
    },
    {
      "id": "6",
      "title": "Permisos",
      "type": "item",
      "icon": "grid",
      "url": "main/permisos"
    },
    {
      "id": "7",
      "title": "Categorias",
      "type": "item",
      "icon": "list",
      "url": "main/categorias"
    },
    {
      "id": "8",
      "title": "Productos",
      "type": "item",
      "icon": "coffee",
      "url": "main/productos-admin"
    },
    {
      "id": "9",
      "title": "Cotizacion",
      "type": "item",
      "icon": "clipboard",
      "url": "main/cotizacion"
    },
    {
      "id": "10",
      "title": "Pedidos",
      "type": "item",
      "icon": "dollar-sign",
      "url": "main/pedidos"
    },
    {
      "id": "11",
      "title": "Pedidos locales",
      "type": "item",
      "icon": "package",
      "url": "main/pedidos-local"
    }

  ]

  userId: number = parseInt(localStorage.getItem("userId"))
  moduleIds = []
  menu = [];

  ngOnInit(): void {
    this.getRolData(this.userId)
  }

  redirect(url: number) {
    this.router.navigate([url]);
  }

  getRolData(idUser: number) {
    //? Primero se obtiene la data del usuario para sacar el rol
    this.usuariosService.getDataById(idUser).subscribe(
      (res: any) => {
        //? Se trae la información del rol con respecto al rol del usuario
        this.rolesService.getAllRolDataById(res[0].id_rol).subscribe(
          (res: any) => {
            res.forEach(item => {
              this.moduleIds.push(item.id)
            });
            //? se filtran solo los kmkodulos a los que el usuario tiene permiso
            this.menu = this.modules.filter(item => this.moduleIds.includes(parseInt(item.id)))
          }
        )
      }
    )
  }



}

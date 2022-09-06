import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { PermisosService } from "app/modules/services/permisos/permisos.service";
import { RolesService } from "app/modules/services/roles/roles.service";
import { of } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  encapsulation: ViewEncapsulation.None //! Esto es importante para que se muestren bien los estilos, siempre agregar a los componentes.
})
export class RolesComponent implements OnInit {

  public selectedOption = 10; //? Este es el selector de cuantas filas quieres ver en la tabla, en este caso, 10.
  public ColumnMode = ColumnMode; //? Esto es para que cuando selecciones una fila, se seleccione la fila y no el boton.
  private tempData = []; //? Estas son cosas del buiscador (Que no funciona)
  public kitchenSinkRows: any;
  selectBasic: any;
  
  rows: any = [ //? Estos son los datos de la tabla quemados.
    
  ]

  constructor(
    private modalService: NgbModal, 
    private permisosService: PermisosService,
    private rolesService: RolesService
  ) { }

  ngOnInit(): void {
    this.tempData = this.rows; //? Esto también es del buscador (Que no funciona)
    this.kitchenSinkRows = this.rows;
    this.getPermisos();
    this.getRoles();
  }

  modalOpen(modal) { //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }

  getRoles(){

    this.rolesService.getData().subscribe(
      (res: any)=>{
        this.rows = res;
      }
    )

  }


  getPermisos(){
    this.permisosService.getData().subscribe(
      (res: any) => {
        this.selectBasic = of(res).pipe();
        console.log(this.selectBasic);
      });
  }

}

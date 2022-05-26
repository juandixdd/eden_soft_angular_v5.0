import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';

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
  
  rows: any = [ //? Estos son los datos de la tabla quemados.
    {
      id: 1,
      name: 'Admin 1',
      permissions: ''
    },
    {
      id: 2,
      name: 'Admin 2',
      permissions: ''

    }
  ]

  constructor(
    private modalService: NgbModal, //? Aquí se instancia el servicio para abrir la modal.
  ) { }

  ngOnInit(): void {
    this.tempData = this.rows; //? Esto también es del buscador (Que no funciona)
    this.kitchenSinkRows = this.rows;
  }

  modalOpen(modal) { //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }

  confirmAlert() { //? Esta es la funcion que abre el sweetAlert de confirmacion.
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Si desactivas este rol, desactivaras a todos los usuarios que pertenecen a este rol!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, desactivar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Desactivado!',
          'Este rol ha sido desactivado.',
          'success'
        )
      }
    })
  }

  filterUpdate(event) { //? Buscador, no le pare bolas.
    const val = event.target.value.toLowerCase();

    const temp = this.tempData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
  }



}

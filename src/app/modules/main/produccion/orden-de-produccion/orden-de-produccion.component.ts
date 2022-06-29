import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orden-de-produccion',
  templateUrl: './orden-de-produccion.component.html',
  styleUrls: ['./orden-de-produccion.component.scss'],
  encapsulation: ViewEncapsulation.None //! Esto es importante para que se muestren bien los estilos, siempre agregar a los componentes.

})
export class OrdenDeProduccionComponent implements OnInit {

  //! Oes, cuando no entiendan para que es una cosa, le dan ctrl + f para buscar en el codigo de html, tal vez ahí tengan una mjeor noción de para que sirve cada cosa.

  public selectedOption = 10; //? Este es el selector de cuantas filas quieres ver en la tabla, en este caso, 10.
  public ColumnMode = ColumnMode; //? Esto es para que cuando selecciones una fila, se seleccione la fila y no el boton.
  private tempData = []; //? Estas son cosas del buiscador (Que no funciona)
  public kitchenSinkRows: any;

  selectBasic = [ //? Estos son los datos del select de la modal de crear cotizacion.
    'Buñuelo',
    'Palito de queso',
    'Arepa de huevo',
  ]

  rows: any = [ //? Estos son los datos de la tabla quemados.
    {
      id: 1,
      order: '1000',
      delivery_date: '2022-12-12',
      status: 'En proceso',
      payment:'Si',
    },
    {
      id: 2,
      order: '1001',
      delivery_date: '2022-12-12',
      status: 'Recibido',
      payment:'No',
    },
    {
      id: 3,
      order: '1002',
      delivery_date: '2022-12-12',
      status: 'En proceso',
      payment:'Si',
    },
    {
      id: 4,
      order: '1003',
      delivery_date: '2022-12-12',
      status: 'Listo',
      payment:'Si',
    },
    {
      id: 5,
      order: '1004',
      delivery_date: '2022-12-12',
      status: 'Recibido',
      payment:'No',
    },
    {
      id: 6,
      order: '1005',
      delivery_date: '2022-12-12',
      status: 'En proceso',
      payment:'Si',
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
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminada!',
          'La cotización ha sido eliminada.',
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

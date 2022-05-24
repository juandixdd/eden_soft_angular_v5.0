import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
  encapsulation: ViewEncapsulation.None //! Esto es importante para que se muestren bien los estilos, siempre agregar a los componentes.

})
export class ListaUsuariosComponent implements OnInit {
  public kitchenSinkRows: any;
  public selectedOption = 10; //? Este es el selector de cuantas filas quieres ver en la tabla, en este caso, 10.
  constructor(
    private modalService: NgbModal, //? Aquí se instancia el servicio para abrir la modal.
  ) { }

  private tempData = []; //? Estas son cosas del buiscador (Que no funciona)
  public ColumnMode = ColumnMode; //? Esto es para que cuando selecciones una fila, se seleccione la fila y no el boton.
  rows: any = [ //? Estos son los datos de la tabla quemados.
  {
    id:1037632160,
    nombre:'jesus',
    apellidos:'perez',
    email:'juan@gmail.com',
    direccion:'Calle 39B sur',
    phone: 3006483858,
  },
  {
    id:1037632160,
    nombre:'jesus',
    apellidos:'perez',
    email:'juan@gmail.com',
    direccion:'Calle 39B sur',
    phone: 3006483858,
  },
  {
    id:1037632160,
    nombre:'jesus',
    apellidos:'perez',
    email:'juan@gmail.com',
    direccion:'Calle 39B sur',
    phone: 3006483858,
  },
  {
    id:1037632160,
    nombre:'jesus',
    apellidos:'perez',
    email:'juan@gmail.com',
    direccion:'Calle 39B sur',
    phone: 3006483858,
  },
  {
    id:1037632160,
    nombre:'jesus',
    apellidos:'perez',
    email:'juan@gmail.com',
    direccion:'Calle 39B sur',
    phone: 3006483858,
  },
  {
    id:1037632160,
    nombre:'jesus',
    apellidos:'perez',
    email:'juan@gmail.com',
    direccion:'Calle 39B sur',
    phone: 3006483858,
  },
  {
    id:1037632160,
    nombre:'jesus',
    apellidos:'perez',
    email:'juan@gmail.com',
    direccion:'Calle 39B sur',
    phone: 3006483858,
  },
  {
    id:1037632160,
    nombre:'jesus',
    apellidos:'perez',
    email:'juan@gmail.com',
    direccion:'Calle 39B sur',
    phone: 3006483858,
  },
  {
    id:1037632160,
    nombre:'jesus',
    apellidos:'perez',
    email:'juan@gmail.com',
    direccion:'Calle 39B sur',
    phone: 3006483858,
  },
  {
    id:1037632160,
    nombre:'jesus',
    apellidos:'perez',
    email:'juan@gmail.com',
    direccion:'Calle 39B sur',
    phone: 3006483858,
  },
  {
    id:1037632160,
    nombre:'jesus',
    apellidos:'perez',
    email:'juan@gmail.com',
    direccion:'Calle 39B sur',
    phone: 3006483858,
  },

]


  ngOnInit(): void {
    this.tempData = this.rows; //? Esto también es del buscador (Que no funciona)
    this.kitchenSinkRows = this.rows;
  }
  modalOpen(modal) { //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
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

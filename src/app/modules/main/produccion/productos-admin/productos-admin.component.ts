import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-admin',
  templateUrl: './productos-admin.component.html',
  styleUrls: ['./productos-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductosAdminComponent implements OnInit {

 //! Oes, cuando no entiendan para que es una cosa, le dan ctrl + f para buscar en el codigo de html, tal vez ahí tengan una mjeor noción de para que sirve cada cosa.

 public selectedOption = 10; //? Este es el selector de cuantas filas quieres ver en la tabla, en este caso, 10.
 public ColumnMode = ColumnMode; //? Esto es para que cuando selecciones una fila, se seleccione la fila y no el boton.
 private tempData = []; //? Estas son cosas del buiscador (Que no funciona)
 public kitchenSinkRows: any;

 selectBasic = [ //? Estos son los datos del select de la modal de crear cotizacion.
   'Bebidas',
   'Fritos',
   'Panaderia',
 ]

 rows: any = [ //? Estos son los datos de la tabla quemados.
   {
     id: 1,
     name: 'buñuelo',
     price: '1000',
     stock: '34',
     category: 'fritos',
   },
   {
    id: 1,
    name: 'buñuelo',
    price: '1000',
    stock: '34',
    category: 'fritos',
  },
  {
    id: 1,
    name: 'buñuelo',
    price: '1000',
    stock: '34',
    category: 'fritos',
  },
  {
    id: 1,
    name: 'buñuelo',
    price: '1000',
    stock: '34',
    category: 'fritos',
  },
  {
    id: 1,
    name: 'buñuelo',
    price: '1000',
    stock: '34',
    category: 'fritos',
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
         'Eliminado!',
         'El producto ha sido eliminada.',
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

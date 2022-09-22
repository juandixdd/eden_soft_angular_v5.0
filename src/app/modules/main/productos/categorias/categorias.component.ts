import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { CategoriaService } from 'app/modules/services/categoria/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriasComponent implements OnInit {


  //! Oes, cuando no entiendan para que es una cosa, le dan ctrl + f para buscar en el codigo de html, tal vez ahí tengan una mjeor noción de para que sirve cada cosa.

  public kitchenSinkRows: any;
  public selectedOption = 10; //? Este es el selector de cuantas filas quieres ver en la tabla, en este caso, 10.
  private tempData = []; //? Estas son cosas del buiscador (Que no funciona)
  public ColumnMode = ColumnMode; //? Esto es para que cuando selecciones una fila, se seleccione la fila y no el boton.

  rows: any = []
  category: any = {};
  idEdit: any;

  constructor(
    private modalService: NgbModal,
    private categoriasService: CategoriaService,
    private fb: FormBuilder
  ) { }

  public categoriasForm: FormGroup = this.fb.group({
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
    ]
  })

  public categoriasFormEdit: FormGroup = this.fb.group({
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
    ]
  })

  

  ngOnInit(): void {
    this.tempData = this.rows; //? Esto también es del buscador (Que no funciona)
    this.kitchenSinkRows = this.rows;
    this.getCategorias();
  }


  getCategorias() {
    this.categoriasService.getData().subscribe(
      (res: any) => {
        this.rows = res;
      }
    )
  }

  createCategoria() {

    this.category = {
      nombre: this.categoriasForm.value.nombre,
      estado: 0
    }


    this.categoriasService.createData(this.category).subscribe(
      (res: any) => {
        console.log(res)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto creado',
          text: 'El producto se ha creado correctamente',
          showConfirmButton: false,
          timer: 1000
        })

        this.modalService.dismissAll();
        this.categoriasForm.reset();
        this.getCategorias();
      },
      (err) => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error, por favor intente nuevamente',
          confirmButtonText: 'Ok'
        })
      }
    )
  }


  getRowData(row) {
    console.log(row, "Este es el evento") 
    this.categoriasFormEdit.controls['nombre'].setValue(row.nombre)
    this.idEdit = row.id
  }

  updateCategoria() {
   
    let newCategoria = {
      nombre: this.categoriasFormEdit.value.nombre,
      id: this.idEdit
    }
    console.log(newCategoria)    
    this.categoriasService.updateData(this.idEdit,newCategoria).subscribe(
      (res:any)=>{
        console.log(res)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Modificado con exito",
          showConfirmButton: false,
          timer: 1000,
        });
        this.getCategorias();
        this.modalService.dismissAll();
        
      }
    )
  }

  deleteCategoria(id) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.categoriasService.deleteData(id).subscribe(
          (res) => {
            let data: any = res;
            this.category = res;
            this.getCategorias();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Permiso eliminado con exito',
              showConfirmButton: false,
              timer: 1000
            });
          }
        );
      }
    })
  }

  modalOpen(modal) { //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }

  statusAlert() { //? Esta es la funcion que abre el sweetAlert de confirmacion.
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Desactivaras esta categoria.",
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
          'Esta categoria ha sido desactivado.',
          'success'
        )
      }
    })
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
          'El cliente ha sido eliminada.',
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

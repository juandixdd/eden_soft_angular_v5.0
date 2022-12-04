import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { CategoriaService } from "app/modules/services/categoria/categoria.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-categorias",
  templateUrl: "./categorias.component.html",
  styleUrls: ["./categorias.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriasComponent implements OnInit {
  //! Oes, cuando no entiendan para que es una cosa, le dan ctrl + f para buscar en el codigo de html, tal vez ahí tengan una mjeor noción de para que sirve cada cosa.

  public kitchenSinkRows: any;
  public selectedOption = 10; //? Este es el selector de cuantas filas quieres ver en la tabla, en este caso, 10.
  private tempData = []; //? Estas son cosas del buiscador (Que no funciona)
  public ColumnMode = ColumnMode; //? Esto es para que cuando selecciones una fila, se seleccione la fila y no el boton.

  rows: any = [];
  category: any = {};
  idEdit: any;
  _filterRows: any = [];

  constructor(
    private modalService: NgbModal,
    private categoriasService: CategoriaService,
    private fb: UntypedFormBuilder
  ) {}

  public categoriasForm: UntypedFormGroup = this.fb.group({
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
  });

  public categoriasFormEdit: UntypedFormGroup = this.fb.group({
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
  });

  //! ------------- SWITCH DE UNA CATEGORIA -------------
  public switchForm: UntypedFormGroup = this.fb.group({
    estado: [],
  });

  ngOnInit(): void {
    this.getCategorias();
  }

  //! ------------- GET Y SET PARA EL BUSCADOR -------------
  get filterRows(): any {
    return this._filterRows;
  }

  set filterRows(value) {
    this._filterRows = value;
  }

  //! ------------- ESTA FUNCION ABRE LAS MODALES -------------
  modalOpen(modal) {
    this.modalService.open(modal, {
      centered: true,
    });
  }

  getCategorias() {
    this.categoriasService.getData().subscribe((res: any) => {
      res.forEach((item) => {
        item.formcontrol = new UntypedFormControl(item.estado);
        this.switchForm.addControl(item.id, item.formcontrol);
      });
      this.rows = res;
      this.filterRows = res;
    });
  }
  //! ------------- CREAR UNA CATEGORIA -------------

  createCategoria() {
    this.category = {
      nombre: this.categoriasForm.value.nombre,
      estado: 1,
    };
    let exists: boolean;
    this.categoriasService
      .validateCategoryExists(this.category.nombre)
      .subscribe((res: any) => {
        console.log("oe");

        if (res.exists === false) {
          try {
            this.categoriasService
              .createData(this.category)
              .subscribe((res: any) => {
                console.log("holi");

                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Categoría creada",
                  text: "La Categoría se ha creado correctamente",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.getCategorias();
                this.modalService.dismissAll();
                this.categoriasForm.reset();
              });
          } catch (error) {
            console.log(error);
          }
        } else if (res.exists === true) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Opps, esta categoría ya se encuentra registrada",
            showConfirmButton: true,
            confirmButtonText: "Ok",
          });
          this.categoriasForm.reset();
        }
      });
  }

  getRowData(row) {
    this.categoriasFormEdit.controls["nombre"].setValue(row.nombre);
    this.idEdit = row.id;
  }

  //! ------------- EDITAR UNA CATEGORIA -------------

  updateCategoria() {
    let newCategoria = {
      nombre: this.categoriasFormEdit.value.nombre,
      id: this.idEdit,
    };
    let exists: boolean;
    this.categoriasService
      .validateCategoryExists(newCategoria.nombre)
      .subscribe((res: any) => {
        console.log("por fuerita");

        if (res.exists === false) {
          try {
            console.log(newCategoria);
            this.categoriasService
              .updateData(this.idEdit, newCategoria)
              .subscribe((res: any) => {
                console.log(res);
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Modificado con exito",
                  showConfirmButton: false,
                  timer: 1000,
                });
                this.getCategorias();
                this.modalService.dismissAll();
              });
          } catch (error) {
            console.log(error);
            
          }
        } else if (res.exists === true) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Opps, esta categoría ya se encuentra registrada",
            showConfirmButton: true,
            confirmButtonText: "Ok",
          });
          this.categoriasForm.reset();
        }
      });
  }

  //! ------------- ELIMINAR UNA CATEGORIA -------------

  deleteCategoria(id) {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminarlo!",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.categoriasService.deleteData(id).subscribe((res) => {
          let data: any = res;
          this.category = res;
          this.getCategorias();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Categoría eliminada con exito",
            showConfirmButton: false,
            timer: 1000,
          });
        });
      }
    });
  }

  //! ------------- CAMBIAR ESTADO DE UNA CATEGORIA -------------

  switchEvent({ target }, row) {
    let checked = target.checked;
    let status = {
      estado: checked,
    };
    console.log(status);
    setTimeout(() => {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Cambiarás el estado de esta categoría",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Cambiar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.categoriasService
            .cambiarEstado(row.id, status)
            .subscribe((res: any) => {
              if (res.status === 200) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Se cambio el estado de la categoría",
                  showConfirmButton: false,
                  timer: 1000,
                });
                this.getCategorias();
              }
            });
        } else {
          this.getCategorias();
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "No se cambió el estado de la categoría",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
    }, 100);
  }

  //! ------------- BUSCADOR DE CATEGORIA -------------
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    const filterData = this.rows.filter((item: any) => {
      const filterData =
        item.id.toString().toLowerCase().includes(val) ||
        item.nombre.toString().toLowerCase().includes(val);
      return filterData;
    });

    // update the rows
    this.filterRows = filterData;

    console.log(filterData);
  }

  //! ------------- VALIDACIONES DE CAMPOS Y BOTONES-------------

  validField(field: string) {
    return (
      this.categoriasForm.controls[field].errors &&
      this.categoriasForm.controls[field].touched
    );
  }

  editValidField(field: string) {
    return (
      this.categoriasFormEdit.controls[field].errors &&
      this.categoriasFormEdit.controls[field].touched
    );
  }
}

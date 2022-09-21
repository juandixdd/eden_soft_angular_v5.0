import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { PermisosService } from "app/modules/services/permisos/permisos.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-permisos",
  templateUrl: "./permisos.component.html",
  styleUrls: ["./permisos.component.scss"],
  encapsulation: ViewEncapsulation.None, //! Esto es importante para que se muestren bien los estilos, siempre agregar a los componentes.
})
export class PermisosComponent implements OnInit {
  public kitchenSinkRows: any;
  public selectedOption = 10;

  constructor(
    private modalService: NgbModal, //? Aquí se instancia el servicio para abrir la modal.
    private permisosService: PermisosService,
    private fb: FormBuilder
  ) { }

  private tempData = []; //? Estas son cosas del buiscador (Que no funciona)
  public ColumnMode = ColumnMode; //? Esto es para que cuando selecciones una fila, se seleccione la fila y no el boton.
  rows: any = [];
  _filterRows: any = [];
  permisos: any;
  editPermiso: any;
  newEdit: any;
  idEdit: any;

  //? Get y Set para el buscador
  get filterRows(): any {
    return this._filterRows;
  }

  set filterRows(value) {
    this._filterRows = value;
  }

  ngOnInit(): void {
    this.getPermisos();
  }

  getPermisos() {
    this.permisosService.getData().subscribe((res: any) => {
      console.log(res);
      this.filterRows = res;
    });
  }
  public permisosForm: FormGroup = this.fb.group({
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
    ],
    modulo: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
    ],
  });

  public permisosFormEdit: FormGroup = this.fb.group({
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
    ],
    modulo: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
    ],
  });


  resetForm() {
    this.permisosForm.reset();
  }
  createPermisos() {
    this.permisos = {
      nombre: this.permisosForm.value.nombre,
      modulo: this.permisosForm.value.modulo,
    };
    this.permisosService.createData(this.permisos).subscribe(
      (res: any) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "El permiso se creo con exito",
          showConfirmButton: false,
          timer: 1000,
        });
        this.getPermisos();
        this.modalService.dismissAll();
        this.permisosForm.reset();
      },
      (err: any) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Ooops....",
          text: "Ha ocurrido un error, intentalo de nuevo",
          showConfirmButton: false,
          timer: 1000,
          confirmButtonText: "Ok",
        });
      }
    );
  }

  getRowData(row) {
    console.log(row, "Este es el evento")
    this.permisosFormEdit.controls['nombre'].setValue(row.nombre)
    this.permisosFormEdit.controls['modulo'].setValue(row.modulo)
    this.idEdit = row.id
  }

  updatePermiso() {
   
    let newPermiso = {
      nombre: this.permisosFormEdit.value.nombre,
      modulo: this.permisosFormEdit.value.modulo,
      id: this.idEdit
    }
    console.log(newPermiso)
    this.permisosService.updateData(this.idEdit,newPermiso).subscribe(
      (res:any)=>{
        console.log(res)
        this.getPermisos();
      }
    )
  }


  validField(field: string) {
    return (
      this.permisosForm.controls[field].errors &&
      this.permisosForm.controls[field].touched
    );
  }
  validFieldEdit(field: string) {
    return (
      this.permisosFormEdit.controls[field].errors &&
      this.permisosFormEdit.controls[field].touched
    );
  }

  modalOpen(modal) {
    //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.rows.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.filterRows = temp;
  }
}

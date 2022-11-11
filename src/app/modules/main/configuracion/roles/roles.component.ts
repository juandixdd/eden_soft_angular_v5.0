import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from "@swimlane/ngx-datatable";
import Swal from "sweetalert2";
import { PermisosService } from "app/modules/services/permisos/permisos.service";
import { RolesService } from "app/modules/services/roles/roles.service";
import { of } from "rxjs";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { RolPermisoService } from "app/modules/services/rol_permiso/rol-permiso.service";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.scss"],
  encapsulation: ViewEncapsulation.None, //! Esto es importante para que se muestren bien los estilos, siempre agregar a los componentes.
})
export class RolesComponent implements OnInit {
  public selectedOption = 10; //? Este es el selector de cuantas filas quieres ver en la tabla, en este caso, 10.
  public ColumnMode = ColumnMode; //? Esto es para que cuando selecciones una fila, se seleccione la fila y no el boton.
  private tempData = []; //? Estas son cosas del buiscador (Que no funciona)
  public kitchenSinkRows: any;
  selectBasic: any;

  rows: any = [];
  rol: any = {};
  permisos: any;
  rolData: any;
  permisosList: any;
  _filterRows: any;

  constructor(
    private modalService: NgbModal,
    private permisosService: PermisosService,
    private rolesService: RolesService,
    private rol_permisoService: RolPermisoService,
    private fb: UntypedFormBuilder
  ) {}

  public rolForm: UntypedFormGroup = this.fb.group({
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    categoria: [],
  });

  public switchForm: UntypedFormGroup = this.fb.group({
    estado: [],
  });

  ngOnInit(): void {
    this.getPermisos();
    this.getRoles();
    this.rolForm.reset();
  }
   //? Get y Set para el buscador
   get filterRows(): any {
    return this._filterRows;
  }

  set filterRows(value) {
    this._filterRows = value;
  }

  modalOpen(modal) {
    //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }

  getRoles() {
    this.rolesService.getData().subscribe((res: any) => {
      res.forEach((item) => {
        item.formcontrol = new UntypedFormControl(item.estado);
        this.switchForm.addControl(item.id, item.formcontrol);
      });
      this.rows = res;
      this._filterRows = res;
    });
  }

  getPermisos() {
    this.permisosService.getData().subscribe((res: any) => {
      this.selectBasic = of(res).pipe();
      console.log(this.selectBasic);
    });
  }

  onChange(event) {
    console.log(event);
    this.permisos = event;
  }

  addRol() {
    this.rol = {
      nombre: this.rolForm.value.nombre,
      estado: 1,
    };

    this.rolesService.createData(this.rol).subscribe(
      (res: any) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Producto creado",
          text: "El producto se ha creado correctamente",
          showConfirmButton: false,
          timer: 1000,
        });

        console.log(this.rol);

        //*? Se agrega el rol al rompimiento con respecto al permiso
        this.addRolePermissionRelation(res.idRol);

        this.modalService.dismissAll();
        this.rolForm.reset();
      },
      (err: any) => {
        console.log("No se pudo guardar");
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error, por favor intente nuevamente",
          confirmButtonText: "Ok",
        });
      }
    );
  }

  addRolePermissionRelation(idRol) {
    let relation = {};
    console.log(idRol);
    console.log("Permisos del evento: ", this.permisos);
    this.permisos.forEach((item: any) => {
      relation = {
        id_rol: idRol,
        id_permiso: item.id,
      };
      this.rol_permisoService.createData(relation).subscribe((res: any) => {
        console.log(res);
      });
    });
  }

  reload() {
    this.rolForm.reset();
    this.getRoles();
    this.getPermisos();
  }
  getRolData(id) {
    this.rolesService.getDataById(id).subscribe((res: any) => {
      this.rolData = res[0];
      this.permisosList = this.rolData.permiso.replace(/ /g, "").split(",");
      console.log(this.permisosList);
      
    });
  }
  cerrarModal() {
    this.modalService.dismissAll();
  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    const filterData = this.rows.filter((item: any) => {
      const filterData =
      item.id.toString().toLowerCase().includes(val) ||
      item.rol.toLowerCase().includes(val) ||
      item.nombre_estado.toLowerCase().includes(val); 
      return filterData;

    });
    this.filterRows = filterData;

    console.log(filterData);
  }

  switchEvent({ target }, row) {
    let checked = target.checked;
    let status = {
      estado: checked,
    };

    setTimeout(() => {
      Swal.fire({
        title: "¿Estas seguro?",
        text: "Cambiarás el estado del rol",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Cambiar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.rolesService
            .anularRol(row.id, status)
            .subscribe((res: any) => {
              if (res.status === 200) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Se cambió el estado del rol",
                  showConfirmButton: false,
                  timer: 1000,
                });
                this.getRoles();
              }
            });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "No se cambió el estado del rol",
            showConfirmButton: false,
            timer: 1000,
          });
          this.getRoles();
        }
      });
    }, 100);
  }
}

/*
Así se muestran los permisos organizador en una fila descendente en consola, habría que adaptarlo para que se muestre en la modal

permisos = "Crear, Editar, Eliminar";
separatedPermisos = permisos.replace(/ /g, "").split(",");

separatedPermisos.forEach((item) => {
  console.log(item);
});


*/

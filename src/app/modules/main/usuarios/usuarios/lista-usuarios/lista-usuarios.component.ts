import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { ClientesInformativosService } from "app/modules/services/clientesInformativos/clientes-informativos.service";
import { RegisterService } from "app/modules/services/register/register.service";
import { RolesService } from "app/modules/services/roles/roles.service";
import { UsersService } from "app/modules/services/users/users.service";
import { UsuarioService } from "app/modules/services/usuario/usuario.service";
import { of } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: "app-lista-usuarios",
  templateUrl: "./lista-usuarios.component.html",
  styleUrls: ["./lista-usuarios.component.scss"],
  encapsulation: ViewEncapsulation.None, //! Esto es importante para que se muestren bien los estilos, siempre agregar a los componentes.
})
export class ListaUsuariosComponent implements OnInit {
  public coreConfig: any;
  public passwordTextType: boolean;
  public submitted = false;
  user: any = {};
  editUser: any = {};
  emailExists: boolean = false;
  cedulaExists: boolean = false;
  public ColumnMode = ColumnMode;
  public selectedOption = 10;
  rows: any;
  selectBasic: any;
  rolID: any;
  nombreRol: any;
  _filterRows: any = [];

  constructor(
    private modalService: NgbModal,
    private fb: UntypedFormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private registerService: RegisterService,
    private clientesInformativosService: ClientesInformativosService,
    private rolesService: RolesService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }

  //? Get y Set para el buscador
  get filterRows(): any {
    return this._filterRows;
  }

  set filterRows(value) {
    this._filterRows = value;
  }

  public registerForm: UntypedFormGroup = this.fb.group(
    {
      nombre: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      apellido: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      correo: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.email,
        ],
      ],
      id_cliente_documento: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      telefono: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      contrasena: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      confirmPassword: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      id_rol: ["", [Validators.required]],
    },
    {
      validator: this.ConfirmPasswordValidator("contrasena", "confirmPassword"),
    }
  );

  public editForm: UntypedFormGroup = this.fb.group({
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    apellido: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    correo: [
      "",
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.email,
      ],
    ],
    id_cliente_documento: [
      "",
      [Validators.required, Validators.minLength(6), Validators.maxLength(10)],
    ],
    telefono: [
      "",
      [Validators.required, Validators.minLength(7), Validators.maxLength(15)],
    ],
    id_rol: ["", [Validators.required]],
  });

  public switchForm: UntypedFormGroup = this.fb.group({
    estado: [],
  });

  ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmPasswordValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  switchEvent({ target }, row: any) {
    let checked = target.checked;
    let status = {
      estado: checked === false ? 0 : 1,
    };

    // se crea una variable donde iremos validando si el usuario tiene pedidos, ventasLocales y pedidosLocales activos
    let haveVenta = [];
    this.clientesInformativosService
      .usuariosConVentas(row.id_cliente_documento)
      .subscribe((res: any) => {
        if (res.filter((v) => v.estado === 2 || v.estado === 1).length > 0) {
          haveVenta.push(1);
        } else {
          haveVenta.push(0);
        }
      });
    this.clientesInformativosService
      .usuariosConPedidos(row.id_cliente_documento)
      .subscribe((res: any) => {
        if (res.filter((p) => p.estado === 1).length > 0) {
          haveVenta.push(1);
        } else {
          haveVenta.push(0);
        }
      });
    this.clientesInformativosService
      .usuariosConPedidosLocales(row.id_cliente_documento)
      .subscribe((res: any) => {
        if (res.filter((pl) => pl.estado === 1).length > 0) {
          haveVenta.push(1);
          console.log(haveVenta);
        } else {
          haveVenta.push(0);
          console.log(haveVenta);
        }
      });
// se necesito un setTimeout para que se puedan leer los valores de las variables, si hay un 1 en la array haveData no se puede cambiar el estado
    setTimeout(() => {
      if(haveVenta.includes(1)){
        this.getUsers();
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Este usuario no se puede deshabilitar",
          text:"Tiene algún servicio activo en este momento",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
          
        });
      }else{
        setTimeout(() => {
          Swal.fire({
            title: "¿Estas seguro?",
            text: "Cambiarás el estado del Usuario",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cambiar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              this.clientesInformativosService
                .anularUsuario(row.id_cliente_documento, status)
                .subscribe((res: any) => {
                  if (res.status === 200) {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Se cambió el estado del Usuario",
                      showConfirmButton: false,
                      timer: 1000,
                    });
                    this.getUsers();
                  }
                });
            } else {
              Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Cancelaste la deshabilitación del usuario",
                showConfirmButton: false,
                timer: 1000,
              });
              this.getUsers();
            }
          });
        }, 100);
      }
    }, 500);

    
  }

  modalOpen(modal) {
    //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }

  getUsers() {
    this.usuarioService.getData().subscribe((res: any) => {
      console.log(res);
      res.forEach((item) => {
        item.formcontrol = new UntypedFormControl(item.estado);
        this.switchForm.addControl(item.id_cliente_documento, item.formcontrol);
      });
      this.rows = res;
      this._filterRows = res;
    });
  }

  getRoles() {
    this.rolesService.getData().subscribe((res: any) => {
      console.log(res);
      this.selectBasic = of(res).pipe();
    });
  }

  createUser() {
    let exists: boolean;
    this.user.nombre = this.registerForm.controls["nombre"].value;
    this.user.id_cliente_documento =
      this.registerForm.controls["id_cliente_documento"].value;
    this.user.apellido = this.registerForm.controls["apellido"].value;
    this.user.correo = this.registerForm.controls["correo"].value;
    this.user.contrasena = this.registerForm.controls["contrasena"].value;
    this.user.telefono = this.registerForm.controls["telefono"].value;
    this.user.id_rol = this.rolID;

    this.registerService
      .validateUserExists(this.user.correo)
      .subscribe((res: any) => {
        if (res.exists === false) {
          this.clientesInformativosService
            .getDataById(this.user.id_cliente_documento)
            .subscribe((res: any) => {
              if (res.length === 0) {
                try {
                  this.clientesInformativosService
                    .createCliente(this.user)
                    .subscribe((res: any) => {
                      console.log(res);

                      this.registerService
                        .registerUser(this.user)
                        .subscribe((res: any) => {
                          Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Registro exitoso",
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          this.getUsers();
                          this.modalService.dismissAll();
                          this.registerForm.reset();
                        });
                    });
                } catch (error) {
                  console.log(error);
                }
              } else {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Opps, el número de cedula ya se encuentra registrado",
                  showConfirmButton: true,
                  confirmButtonText: "Ok",
                });
              }
            });
        } else if (res.exists === true) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Opps, el correo ya se encuentra registrado",
            showConfirmButton: true,
            confirmButtonText: "Ok",
          });
        }
      });
  }

  declareEditData(row) {
    this.editUser = {
      nombre: row.nombre,
      apellido: row.apellido,
      id_cliente_documento: row.id_cliente_documento,
      correo: row.correo,
      telefono: row.telefono,
      id_rol: row.id_rol,
    };

    this.rolesService.getDataById(row.id_rol).subscribe((res: any) => {
      this.nombreRol = res[0].rol;
      this.editForm.controls["nombre"].setValue(row.nombre);
      this.editForm.controls["id_cliente_documento"].setValue(
        row.id_cliente_documento
      );
      this.editForm.controls["apellido"].setValue(row.apellido);
      this.editForm.controls["telefono"].setValue(row.telefono);
      this.editForm.controls["correo"].setValue(row.correo);
      this.editForm.controls["id_rol"].setValue(this.nombreRol);
    });

    this.rolesService.getDataById(row.id_rol).subscribe((res: any) => {
      this.nombreRol = res[0].rol;
      this.editForm.controls["nombre"].setValue(row.nombre);
      this.editForm.controls["id_cliente_documento"].setValue(
        row.id_cliente_documento
      );
      this.editForm.controls["apellido"].setValue(row.apellido);
      this.editForm.controls["telefono"].setValue(row.telefono);
      this.editForm.controls["correo"].setValue(row.correo);
      this.editForm.controls["id_rol"].setValue(this.nombreRol);
    });

    this.editForm.controls["nombre"].setValue(row.nombre);
    this.editForm.controls["id_cliente_documento"].setValue(
      row.id_cliente_documento
    );
    this.editForm.controls["apellido"].setValue(row.apellido);
    this.editForm.controls["telefono"].setValue(row.telefono);
    this.editForm.controls["correo"].setValue(row.correo);
    this.editForm.controls["id_rol"].setValue(row.id_rol);
  }
  onChange(event) {
    this.rolID = event.id;
    console.log(this.rolID);
  }

  updateUser() {
    try {
      let edit = {
        id_cliente_documento: this.editForm.value.id_cliente_documento,
        nombre: this.editForm.value.nombre,
        apellido: this.editForm.value.apellido,
        telefono: this.editForm.value.telefono,
        correo: this.editForm.value.correo,
        id_rol: this.rolID || this.editUser.id_rol,
      };
      this.clientesInformativosService
        .updateCliente(this.editUser.id_cliente_documento, edit)
        .subscribe((res: any) => {
          console.log(res);
          this.usuarioService
            .editData(this.editUser.id_cliente_documento, edit)
            .subscribe((res: any) => {
              console.log(res);

              Swal.fire({
                position: "center",
                icon: "success",
                title: "Actualizacion de Datos Exitosa",
                showConfirmButton: false,
                timer: 1500,
              });
              this.getUsers();
              this.modalService.dismissAll();
            });
        });
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Opps, Algo Salio mal, intentalo de nuevo",
        showConfirmButton: true,
        confirmButtonText: "Ok",
      });
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
  }

  validField(field: string) {
    return (
      this.registerForm.controls[field].errors &&
      this.registerForm.controls[field].touched
    );
  }

  validPassword() {
    return (
      this.registerForm.controls["contrasena"].value !==
        this.registerForm.controls["confirmPassword"].value &&
      this.registerForm.controls["contrasena"].value !== ""
    );
  }

  editValidField(field: string) {
    return (
      this.editForm.controls[field].errors &&
      this.editForm.controls[field].touched
    );
  }

  editValidPassword() {
    return (
      this.editForm.controls["contrasena"].value !==
        this.editForm.controls["confirmPassword"].value &&
      this.editForm.controls["contrasena"].value !== ""
    );
  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    const filterData = this.rows.filter((item: any) => {
      const filterData =
        item.nombre.toLowerCase().includes(val) ||
        item.correo.toLowerCase().includes(val) ||
        item.rol.toLowerCase().includes(val) ||
        item.telefono.toString().toLowerCase().includes(val) ||
        item.id_cliente_documento.toString().toLowerCase().includes(val);
      return filterData;
    });

    // update the rows
    this.filterRows = filterData;

    console.log(filterData);
  }
}

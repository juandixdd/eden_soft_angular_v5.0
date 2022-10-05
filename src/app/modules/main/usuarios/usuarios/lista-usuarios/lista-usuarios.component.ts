import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ClientesInformativosService } from 'app/modules/services/clientesInformativos/clientes-informativos.service';
import { RegisterService } from 'app/modules/services/register/register.service';
import { RolesService } from 'app/modules/services/roles/roles.service';
import { UsersService } from 'app/modules/services/users/users.service';
import { UsuarioService } from 'app/modules/services/usuario/usuario.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
  encapsulation: ViewEncapsulation.None //! Esto es importante para que se muestren bien los estilos, siempre agregar a los componentes.

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

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private registerService: RegisterService,
    private clientesInformativosService: ClientesInformativosService,
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  public registerForm: FormGroup = this.fb.group({
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    apellido: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    correo: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.email]
    ],
    id_cliente_documento: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    telefono: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    contrasena: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    confirmPassword: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ]
  })

  public editForm: FormGroup = this.fb.group({
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    apellido: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    correo: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.email]
    ],
    id_cliente_documento: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    telefono: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    contrasena: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    confirmPassword: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ]
  })

  modalOpen(modal) { //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }

  getUsers() {
    this.usuarioService.getData().subscribe(
      (res: any) => {
        console.log(res);
        this.rows = res;

      }
    )
  }

  createUser() {
    let exists: boolean;
    this.user.nombre = this.registerForm.controls['nombre'].value;
    this.user.id_cliente_documento = this.registerForm.controls['id_cliente_documento'].value;
    this.user.apellido = this.registerForm.controls['apellido'].value;
    this.user.correo = this.registerForm.controls['correo'].value;
    this.user.contrasena = this.registerForm.controls['contrasena'].value;
    this.user.telefono = this.registerForm.controls['telefono'].value;


    this.registerService.validateUserExists(this.user.correo).subscribe(
      (res: any) => {
        if (res.exists === false) {
          this.clientesInformativosService.getDataById(this.user.id_cliente_documento).subscribe(
            (res: any) => {
              if (res.length === 0) {
                try {
                  this.clientesInformativosService.createCliente(this.user).subscribe(
                    (res: any) => {
                      console.log(res);

                      this.registerService.registerUser(this.user).subscribe(
                        (res: any) => {
                          Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Registro exitoso',
                            showConfirmButton: false,
                            timer: 1500
                          });
                          this.getUsers();
                          this.modalService.dismissAll();

                        }
                      )
                    }
                  )
                } catch (error) {
                  console.log(error);

                }
              }
              else {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Opps, el número de cedula ya se encuentra registrado',
                  showConfirmButton: true,
                  confirmButtonText: "Ok"
                })
              }
            }
          )

        } else if (res.exists === true) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Opps, el correo ya se encuentra registrado',
            showConfirmButton: true,
            confirmButtonText: "Ok"
          })

        }
      })
  }

  declareEditData(row) {
    this.editForm.controls['nombre'].setValue(row.nombre);
    this.editForm.controls['id_cliente_documento'].setValue(row.id_cliente_documento);
    this.editForm.controls['apellido'].setValue(row.apellido);
    this.editForm.controls['telefono'].setValue(row.telefono);
    this.editForm.controls['correo'].setValue(row.correo);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
  }

  validField(field: string) {
    return this.registerForm.controls[field].errors &&
      this.registerForm.controls[field].touched
  }

  validPassword() {
    return this.registerForm.controls['contrasena'].value !== this.registerForm.controls['confirmPassword'].value &&
      this.registerForm.controls['contrasena'].value !== '';
  }

  editValidField(field: string) {
    return this.editForm.controls[field].errors &&
      this.editForm.controls[field].touched
  }

  editValidPassword() {
    return this.editForm.controls['contrasena'].value !== this.editForm.controls['confirmPassword'].value &&
      this.editForm.controls['contrasena'].value !== '';
  }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from 'app/modules/services/register/register.service';
import { ClientesInformativosService } from 'app/modules/services/clientesInformativos/clientes-informativos.service';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistroUsuariosComponent implements OnInit {
  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public submitted = false;
  user: any = {};
  emailExists: boolean = false;
  cedulaExists: boolean = false;

  // Private
  private _unsubscribeAll: Subject<any>;



  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private fb: FormBuilder,
    private registerService: RegisterService,
    private clientesInformativosService: ClientesInformativosService,
    private router: Router
  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
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
    ],
    

  })


  get f() {
    return this.registerForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
  }
  ngOnInit(): void {
  }

  createUser() {
    let exists: boolean;
    this.user.nombre = this.registerForm.controls['nombre'].value;
    this.user.id_cliente_documento = this.registerForm.controls['id_cliente_documento'].value;
    this.user.apellido = this.registerForm.controls['apellido'].value;
    this.user.correo = this.registerForm.controls['correo'].value;
    this.user.contrasena = this.registerForm.controls['contrasena'].value;
    this.user.telefono = this.registerForm.controls['telefono'].value;
    this.user.id_rol=3;

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
                          this.router.navigate(['/main/login']);

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



  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  validField(field: string) {
    return this.registerForm.controls[field].errors &&
      this.registerForm.controls[field].touched
  }

  validPassword() {
    return this.registerForm.controls['contrasena'].value !== this.registerForm.controls['confirmPassword'].value &&
      this.registerForm.controls['contrasena'].value !== '';
  }
}

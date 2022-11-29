import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { ClientesInformativosService } from 'app/modules/services/clientesInformativos/clientes-informativos.service';
import { RegisterService } from 'app/modules/services/register/register.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-usuarios-con-data',
  templateUrl: './registrar-usuarios-con-data.component.html',
  styleUrls: ['./registrar-usuarios-con-data.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrarUsuariosConDataComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;
  googleUser: any = JSON.parse(localStorage.getItem("googleUser"));
  provider: any;
  user: any = {};

  constructor(
    private _coreConfigService: CoreConfigService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private clientesInformativosService: ClientesInformativosService,
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
          hidden: false
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  public registerForm: UntypedFormGroup = this.fb.group({
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
      [Validators.required, Validators.email, Validators.minLength(3)]
    ],
    id_cliente_documento: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(10)]
    ],
    telefono: [
      '',
      [Validators.required, Validators.minLength(7), Validators.maxLength(15)]
    ],
    contrasena: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(30)]
    ],
    confirmPassword: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(30)]
    ],


  },
    {
      validator: this.ConfirmPasswordValidator("contrasena", "confirmPassword")
    })

  ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
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




  ngOnInit(): void {
    console.log(this.googleUser);
    this.setFormData();

  }

  validField(field: string) {
    return this.registerForm.controls[field].errors &&
      this.registerForm.controls[field].touched
  }

  validPassword() {
    return this.registerForm.controls['contrasena'].value !== this.registerForm.controls['confirmPassword'].value &&
      this.registerForm.controls['contrasena'].value !== '';
  }

  setFormData() {
    this.provider = this.googleUser.provider
    this.registerForm.controls['nombre'].setValue(this.googleUser.firstName);
    this.registerForm.controls['apellido'].setValue(this.googleUser.lastName);
    this.registerForm.controls['correo'].setValue(this.googleUser.email);
  }

  createUser() {
    let exists: boolean;
    this.user.nombre = this.registerForm.controls['nombre'].value;
    this.user.id_cliente_documento = this.registerForm.controls['id_cliente_documento'].value;
    this.user.apellido = this.registerForm.controls['apellido'].value;
    this.user.correo = this.registerForm.controls['correo'].value;
    this.user.contrasena = this.registerForm.controls['contrasena'].value;
    this.user.telefono = this.registerForm.controls['telefono'].value;
    this.user.img = this.googleUser.photoUrl || null;
    this.user.id_rol = 10;

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
                          this.router.navigate(['main/login']);
                          this.googleUser = "";
                          localStorage.removeItem("googleUser")

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

  loginRedirect() {
    this.router.navigate(['main/login']);
  }

}

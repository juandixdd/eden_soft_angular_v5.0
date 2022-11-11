import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

import { CoreConfigService } from "@core/services/config.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RecuperarContrasenaService } from "app/modules/services/recuperarContrasena/recuperar-contrasena.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-restaurar-clave",
  templateUrl: "./restaurar-clave.component.html",
  styleUrls: ["./restaurar-clave.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RestaurarClaveComponent implements OnInit {
  constructor(
    private _coreConfigService: CoreConfigService,
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private recuperarService: RecuperarContrasenaService,
    private router: Router
  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
        footer: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };
  }

  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public confPasswordTextType: boolean;
  public resetPasswordForm: UntypedFormGroup;
  public submitted = false;

  token: any = this.activatedRoute.snapshot.params.token;
  user: any = {};

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */

  public recuperarForm: UntypedFormGroup = this.fb.group({
    password: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(30)],
    ],
    confirmPassword: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(30)],
    ],
  },
  {
    validator:this.ConfirmPasswordValidator("password","confirmPassword")
  });

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


  get f() {
    return this.resetPasswordForm.controls;
  }

  /**
   * On Submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }
  }

  ngOnInit() {
    console.log(this.token);

    setTimeout(() => {
      this.validateUser();
    }, 1000);
  }
  //valido al usuario por medio de token
  validateUser() {
    let body = {
      token: this.activatedRoute.snapshot.params.token,
    };
    this.recuperarService.verificarToken(body).subscribe((res: any) => {
      this.user = res.data[0].id_cliente_documento;
      console.warn(this.user);
    });
  }

  updatePassword() {
    let body = {
      contrasena: this.recuperarForm.value.confirmPassword,
    };
    this.recuperarService
      .cambiarClave(this.user, body)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Actualizacion de Contraseña Exitosa",
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/main/login']);
        }else{
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Ha ocurrido un error, vuelve a intentar",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  validField(field: string) {
    return (
      this.recuperarForm.controls[field].errors &&
      this.recuperarForm.controls[field].touched
    );
  }

  validPassword() {
    return (
      this.recuperarForm.controls["password"].value !==
        this.recuperarForm.controls["confirmPassword"].value &&
      this.recuperarForm.controls["password"].value !== ""
    );
  }
}

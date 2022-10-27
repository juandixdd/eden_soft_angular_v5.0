import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CoreConfigService } from "@core/services/config.service";
import { RecuperarContrasenaService } from "app/modules/services/recuperarContrasena/recuperar-contrasena.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
  selector: "app-recuperar-clave",
  templateUrl: "./recuperar-clave.component.html",
  styleUrls: ["./recuperar-clave.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RecuperarClaveComponent implements OnInit {
  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public confPasswordTextType: boolean;
  public resetPasswordForm: FormGroup;
  public submitted = false;
  body: any = {};
  timer: boolean = false;

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
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    private recuperarContrasenaService: RecuperarContrasenaService
  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    /* this._coreConfigService.config = {
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
    };*/
  }

  public recuperarForm: FormGroup = this.fb.group({
    email: [
      "",
      [Validators.required, Validators.email, Validators.minLength(1)],
    ],
  });

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.recuperarForm.invalid) {
      return;
    }
  }

  ngOnInit(): void {
    // Subscribe to config changes
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
      });
  }
  validField(field: string) {
    return (
      this.recuperarForm.controls[field].errors &&
      this.recuperarForm.controls[field].touched
    );
  }
  enviarCorreo() {
    this.timer = true;
    let email = this.recuperarForm.controls["email"].value;
    this.recuperarContrasenaService
      .validateEmail(email)
      .subscribe((res: any) => {
        console.log(res);
        if (res.length === 0) {
          Swal.fire({
            title: "Este correo no esta registrado",
            confirmButtonText: "OK",
            icon: "error",
            position: "center",
          });
          this.timer = false;
        } else {
          this.body = {
            toSend: email,
          };
          console.log(this.body);

          this.recuperarContrasenaService
            .sendEmail(this.body)
            .subscribe((res: any) => {
              console.log(res);
              if (res.status === 200) {
                Swal.fire({
                  title:
                    "Te enviamos un correo de confirmacion, porfavor revisalo!",
                  confirmButtonText: "OK",
                  icon: "success",
                  position: "center",
                });
                this.timer = false;
              } else {
                Swal.fire({
                  title: "Surgio un problema, intentalo de nuevo",
                  confirmButtonText: "OK",
                  icon: "error",
                  position: "center",
                });
                this.timer = false;
              }
            });
        }
      });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

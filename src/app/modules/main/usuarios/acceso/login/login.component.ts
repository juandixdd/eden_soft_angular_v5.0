import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { takeUntil, first } from 'rxjs/operators';
import { Subject } from 'rxjs';


import { CoreConfigService } from '@core/services/config.service';
import Swal from 'sweetalert2';
import { LoginService } from 'app/modules/services/login/login.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  //  Public
  public coreConfig: any;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public contrasenaTextType: boolean;
  user: any = {};
  googleUser: any;
  loggedIn: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: UntypedFormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private fb: UntypedFormBuilder,
    private loginService: LoginService,
    private router: Router,
    private authGoogle: SocialAuthService

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


  public loginForm: UntypedFormGroup = this.fb.group({
    correo: [
      "",
      [Validators.required, Validators.email],
    ],
    contrasena: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  })

  /**
   * Toggle contrasena
   */
  togglecontrasenaTextType() {
    this.contrasenaTextType = !this.contrasenaTextType;
  }

  onSubmit() {


  }

  ngOnInit(): void {

    this.authGoogle.authState.subscribe((user) => {
      this.googleUser = user;
      this.loggedIn = (user != null)
      console.log(this.googleUser);

    })

  }

  loginUser() {
    this.user.correo = this.loginForm.controls['correo'].value;
    this.user.contrasena = this.loginForm.controls['contrasena'].value;

    this.loginService.login(this.user).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          console.log("Login exitoso")
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login exitoso',
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.userId);
          this.router.navigate(['main/home-page']);
        } else {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario o la contraseña son incorrectos'
          })
        }
      }
    )

  }


}

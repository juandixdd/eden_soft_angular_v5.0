import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { RecuperarContrasenaService } from 'app/modules/services/recuperarContrasena/recuperar-contrasena.service';

@Component({
  selector: 'app-restaurar-clave',
  templateUrl: './restaurar-clave.component.html',
  styleUrls: ['./restaurar-clave.component.scss'],
  encapsulation: ViewEncapsulation.None
})



export class RestaurarClaveComponent implements OnInit {
  constructor(
    private _coreConfigService: CoreConfigService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private recuperarService: RecuperarContrasenaService
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
    }
  }

  // Public
  public coreConfig: any;
  public passwordTextType: boolean;
  public confPasswordTextType: boolean;
  public resetPasswordForm: FormGroup;
  public submitted = false;


  token: any = this.activatedRoute.snapshot.params.token;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */


  public recuperarForm: FormGroup = this.fb.group({
    password: [
      "",
      [Validators.required, Validators.email, Validators.minLength(5)],
    ],
    confirmPassword: [
      "",
      [Validators.required, Validators.email, Validators.minLength(5)],
    ],
  });

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

  validateUser() {
    let body = {
      token: this.activatedRoute.snapshot.params.token
    }
    this.recuperarService.verificarToken(body).subscribe(
      (res: any) => {
        console.log(res);

      }
    )
  }

}

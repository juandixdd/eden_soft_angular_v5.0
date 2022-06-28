import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';

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

  // Private
  private _unsubscribeAll: Subject<any>;



  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */
  constructor(private _coreConfigService: CoreConfigService, private _formBuilder: FormBuilder, private fb: FormBuilder,) {
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
    names: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    last_names: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    document:[
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    email: [
      "",
      [Validators.required, Validators.email],
    ],
    password: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    confirmPassword: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    phone: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    direction: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ]
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

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

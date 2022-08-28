import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from 'app/modules/services/register/register.service';

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
    private modalService: NgbModal,
    private registerService: RegisterService,
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
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    last_name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    email: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.email]
    ],
    id: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    adress: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    phone: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    confirmPassword: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
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

  createUser() {
    this.user.name = this.registerForm.controls['name'].value;
    this.user.id = this.registerForm.controls['id'].value;
    this.user.last_name = this.registerForm.controls['last_name'].value;
    this.user.email = this.registerForm.controls['email'].value;
    this.user.password = this.registerForm.controls['password'].value;
    this.user.adress = this.registerForm.controls['adress'].value;
    this.user.phone = this.registerForm.controls['phone'].value;

    this.registerService.registerUser(this.user).subscribe(
      (res: any) => {
        if (res.statusCode == 403) {
          this.modalService.dismissAll();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.status
          })
        } else {
          this.modalService.dismissAll();
          this.registerForm.reset();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario creado con exito',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigate(['main/login']);
        }
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { UsersService } from 'app/modules/main/services/users/users.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-change-password-page',
  templateUrl: './auth-change-password-page.component.html',
  styleUrls: ['./auth-change-password-page.component.scss']
})
export class AuthChangePasswordPageComponent implements OnInit {

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _usersService: UsersService,
    private _router: Router
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

  ngOnInit(): void {
  }

  /* Form */
  public passwordForm = this._formBuilder.group({
    password: [''],
    password_confirmation: ['']
  });

  changePassword(form) {
    const password = {
      password: form,
    };
    const id = parseInt(localStorage.getItem('userID'));

    this._usersService.updateUser(id, password).subscribe(
      (response: any) => {
        if (response === true) {
          Swal.fire({
            icon: 'success',
            title: 'Contraseña actualizada',
            showConfirmButton: false,
            timer: 1500
          });
          this._router.navigate(['/main/gyms']);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'La contraseña no se ha podido actualizar',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }

    )


  }

}

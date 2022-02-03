import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CoreConfigService } from '@core/services/config.service';
import { Subject } from 'rxjs';

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

}

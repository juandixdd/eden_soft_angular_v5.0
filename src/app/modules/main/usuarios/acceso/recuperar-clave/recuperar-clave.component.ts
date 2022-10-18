import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreConfigService } from '@core/services/config.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecuperarClaveComponent implements OnInit {
 // Public
 public coreConfig: any;
 public passwordTextType: boolean;
 public confPasswordTextType: boolean;
 public resetPasswordForm: FormGroup;
 public submitted = false;
 

 // Private
 private _unsubscribeAll: Subject<any>;

 /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   */

  constructor
  (private _coreConfigService: CoreConfigService, 
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,) { 
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
      [Validators.required, Validators.email],
    ],
    contrasena: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  })

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.recuperarForm.invalid) {
      return;
    }
  }
  
  ngOnInit(): void {
    

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}

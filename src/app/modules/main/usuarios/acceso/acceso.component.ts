import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccesoComponent implements OnInit {
 // Public
 public emailVar;
 public coreConfig: any;
 public forgotPasswordForm: FormGroup;
 public submitted = false;

 // Private
 private _unsubscribeAll: Subject<any>;

 /**
  * Constructor
  *
  * @param {CoreConfigService} _coreConfigService
  * @param {FormBuilder} _formBuilder
  *
  */
 constructor(private _coreConfigService: CoreConfigService, private _formBuilder: FormBuilder) {
   this._unsubscribeAll = new Subject();

   // Configure the layout
  
   
 }

 // convenience getter for easy access to form fields
 get f() {
   return this.forgotPasswordForm.controls;
 }

 /**
  * On Submit
  */
 onSubmit() {
   this.submitted = true;

   // stop here if form is invalid
   if (this.forgotPasswordForm.invalid) {
     return;
   }
 }

 // Lifecycle Hooks
 // -----------------------------------------------------------------------------------------------------

 /**
  * On init
  */
 ngOnInit(): void {
   this.forgotPasswordForm = this._formBuilder.group({
     email: ['', [Validators.required, Validators.email]]
   });

   // Subscribe to config changes
   this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
     this.coreConfig = config;
   });
 }

 /**
  * On destroy
  */
 ngOnDestroy(): void {
   // Unsubscribe from all subscriptions
   this._unsubscribeAll.next();
   this._unsubscribeAll.complete();
 }

}

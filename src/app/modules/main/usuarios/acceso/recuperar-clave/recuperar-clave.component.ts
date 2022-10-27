import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreConfigService } from '@core/services/config.service';
import { RecuperarContrasenaService } from 'app/modules/services/recuperarContrasena/recuperar-contrasena.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

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
 body:any={};
 

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
    private fb: FormBuilder,
    private recuperarContrasenaService:RecuperarContrasenaService,) { 
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

  enviarCorreo(){
    this.body = {
      email: this.recuperarForm.controls['email'].value
      }
    console.log(this.body);
    
    this.recuperarContrasenaService.sendEmail(this.body).subscribe(
      (res:any)=>{
        if(res.statusCode==200){
          console.log("Correo Enviado exitosamente");
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Correo Enviado exitosamente',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo es incorrecto o no esta registrado en nuesto sistema🤔'
          })
        }
      }
    )
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}

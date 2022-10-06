import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil, first } from 'rxjs/operators';
import { Subject } from 'rxjs';


import { CoreConfigService } from '@core/services/config.service';
import Swal from 'sweetalert2';
import { LoginService } from 'app/modules/services/login/login.service';
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

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
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
          hidden: false
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }


  public loginForm: FormGroup = this.fb.group({
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
          this.router.navigate(['main/dashboard']);
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

  /**
     * On destroy
     */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


 /*  
 try {
    this.timer = true;
    let usuario;
    let itemQuantity = [];
    let itemQuantitySum;
    let cont: number = 0;
    this.usersService.getDataById(item.userId).subscribe((res: any) => {
      usuario = res[0];
      console.log(usuario);

      //? Aqui se calcula el total del precio de los productos
      this.items.forEach((item) => {
        this.productosService
          .getDataById(item.itemId)
          .subscribe((res: any) => {
            cont = res[0].precio * item.itemQuantity;
            itemQuantity.push(cont);
            itemQuantitySum = itemQuantity.reduce((a, b) => a + b, 0);
            console.log(itemQuantitySum, "xd");
          });
      });

      //? Se guarda el nuevo pedido como cotización
      setTimeout(() => {
        let newItem = {
          id_usuario_documento: usuario.id,
          fecha_registro: moment().format("YYYY-MM-D"),
          estado: 1,
          tipo: "cotizacion",
          precio_total: itemQuantitySum,
          fecha_entrega: "2022-09-17",
        };

        this.pedidosService.createPedido(newItem).subscribe((res: any) => {
          console.log(res);
          this.newCotizacionId = res.pedidoId;
        });
        console.log(this.items);
        let producto: any = {};

        //? Se guarda el detalle del pedido
        this.items.forEach((item) => {
          setTimeout(() => {
            this.productosService
              .getDataById(item.itemId)
              .subscribe((res: any) => {
                producto = res;
                let detalle_producto = {
                  id_producto: item.itemId,
                  cantidad: item.itemQuantity,
                  precio_unitario: producto[0].precio,
                  id_pedido: this.newCotizacionId,
                };
                this.pedidosService
                  .createDetalle(detalle_producto)
                  .subscribe((res: any) => {
                    console.log(res);
                  });
              });
          }, 1000);
        });
        this.timer = false;

        //? se confirma el guardado
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Hecho!",
          text: "Se guardó la cotización",
          showConfirmButton: false,
          timer: 1000,
        });

        //? se manda al usuario para las cotizaciones
        this.router.navigate(["main/cotizacion/user"]);
      }, 1500);
    });
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Oops...",
      text: "Algo salió mal, intentalo de nuevo",
      showConfirmButton: false,
      timer: 1000,
    });
  } */
}

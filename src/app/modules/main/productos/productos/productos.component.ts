import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'app/modules/services/login/login.service';
import { ProductosService } from 'app/modules/services/productos/productos.service';
import { UsersService } from 'app/modules/services/users/users.service';
import { count } from 'console';
import moment, { parseTwoDigitYear } from 'moment';
import { parse } from 'path';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductosComponent implements OnInit {

  products: any;
  carritoProductsIds: any = [];
  arrayProducts: any;
  wishListIds: any = [];
  productxd = [];
  public items = JSON.parse(localStorage.getItem("wishList")) || [];
  // Private
  private _unsubscribeAll: Subject<any>;
  user: any = {};
  public passwordTextType: boolean;

  constructor(
    private _coreConfigService: CoreConfigService,
    private productosService: ProductosService,
    private usersService: UsersService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
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

  modalOpen(modal) {
    //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }

  public loginForm: FormGroup = this.fb.group({
    email: [
      "",
      [Validators.required, Validators.email],
    ],
    password: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  })

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts() {
    this.productosService.getData().subscribe(
      (res) => {
        this.products = res;
        console.log(this.products);
      }
    )
  }

  /*  public item = {
     itemName: '',
     itemQuantity: ''
   }; */

  saveProducts() {
    localStorage.setItem("wishList", JSON.stringify(this.items))
  }

  saveProductsEvent({ target }) {
    const value = target.value;
    const name = target.id;
    let altArray = JSON.parse(localStorage.getItem("wishList"));
    let modItem = altArray.find((item) => item.itemName === name)
    modItem.itemQuantity = value;
    let index = altArray.findIndex((item) => item.itemName === name);
    altArray[index] = modItem;
    localStorage.setItem("wishList", JSON.stringify(altArray));
  }

  // public


  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add Item
   */
  addItem(id, name) {
    let wishList = JSON.parse(localStorage.getItem("wishList")) || []
    let item = wishList.filter((item) => item.itemName === name)
    if (item.length === 0) {
      this.items.push({
        itemId: id,
        itemName: name,
        itemQuantity: 1
      });
      this.saveProducts();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Hecho!",
        text: "Se agregó el producto al carrito",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: "Ya agregaste este producto al carrito",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }


  /**
   * DeleteItem
   *
   * @param id
   */
  deleteItem(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items.indexOf(this.items[i]) === id) {
        this.items.splice(i, 1);
        break;
      }
    }
  }

  generarCotizacion(item){
    let usuario;
    this.usersService.getDataById(item.userId).subscribe(
      (res:any)=>{
        usuario = res[0];
        console.log(usuario)
        
        let newItem = {
          id_usuario_documento: usuario.id,
          fecha_registro: moment().format('YYYY-MM-D'),
          estado: '',
          pago: 0
        }

        console.log(newItem)
      }
    )
 
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  //!************************** funcion de login *********************************
  userData: any;
  loginUser() {

    this.user.email = this.loginForm.controls['email'].value;
    this.user.password = this.loginForm.controls['password'].value;

    this.loginService.login(this.user).subscribe(
      (res: any) => {
        if (res.statusCode == 200) {
          console.log("Login exitoso")
          this.generarCotizacion(res)
          this.modalService.dismissAll();
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.userId);
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

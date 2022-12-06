import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { CoreConfigService } from "@core/services/config.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ClientesInformativosService } from "app/modules/services/clientesInformativos/clientes-informativos.service";
import { LoginService } from "app/modules/services/login/login.service";
import { PedidosService } from "app/modules/services/pedidos/pedidos.service";
import { ProductosService } from "app/modules/services/productos/productos.service";
import { UsersService } from "app/modules/services/users/users.service";
import { UsuarioService } from "app/modules/services/usuario/usuario.service";
import { count } from "console";
import moment, { parseTwoDigitYear } from "moment";
import { parse } from "path";
import { Subject } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: "app-productos",
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProductosComponent implements OnInit {
  products: any;
  rows: any = [];
  _filterRows: any;
  carritoProductsIds: any = [];
  arrayProducts: any;
  wishListIds: any = [];
  productxd = [];
  timer: boolean = false;
  type: string = "";
  listFiltered = [];
  searchTerm$ = new Subject<string>();

  public items = JSON.parse(localStorage.getItem("wishList")) || [];

  // Private
  private _unsubscribeAll: Subject<any>;

  public passwordTextType: boolean;

  user: any = {};
  newCotizacionId;

  constructor(
    private _coreConfigService: CoreConfigService,
    private productosService: ProductosService,
    private pedidosService: PedidosService,
    private usersService: UsersService,
    private loginService: LoginService,
    private modalService: NgbModal,
    private fb: UntypedFormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private clientesInformativosService: ClientesInformativosService
  ) {
    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true,
        },
        menu: {
          hidden: true,
        },
        footer: {
          hidden: false,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };
  }

  //! ------------- GET Y SET PARA EL BUSCADOR -------------
  get filterRows(): any {
    return this._filterRows;
  }

  set filterRows(value) {
    this._filterRows = value;
  }

  modalOpen(modal, tipo) {
    //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
    this.type = tipo;
  }

  public loginForm: UntypedFormGroup = this.fb.group({
    correo: ["", [Validators.required, Validators.email]],
    contrasena: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  });

  ngOnInit(): void {
    this.getProducts();
    console.log(this.items);
    this.filterList();
  }

  reloadPage() {
    setTimeout(() => {
      this.router
        .navigate(["/main/home-page"])
        .then(() => window.location.reload());
    }, 100);
  }

  getProducts() {
    this.productosService.getDataCatalogo().subscribe((res) => {
      this.products = res;
      console.log(this.products);
      this.listFiltered = this.products;
    });
  }

  /*  public item = {
     itemName: '',
     itemQuantity: ''
   }; */

  saveProducts() {
    localStorage.setItem("wishList", JSON.stringify(this.items));
  }

  saveProductsEvent({ target }, name) {
    const value = target.value;
    let altArray = JSON.parse(localStorage.getItem("wishList"));
    let modItem = altArray.find((item) => item.itemName === name);
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
  addItem(id, name, price) {
    let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
    let item = wishList.filter((item) => item.itemName === name);
    if (item.length === 0) {
      this.items.push({
        itemId: id,
        itemName: name,
        itemQuantity: 1,
        itemPrice: price,
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

  generarCotizacion(item) {
    try {
      this.timer = true;
      let usuario;
      let itemQuantity = [];
      let itemQuantitySum;
      let cont: number = 0;
      let producto: any = {};

      this.clientesInformativosService
        .getDataById(item.userId)
        .subscribe((res: any) => {
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
              id_cliente_documento: usuario.id_cliente_documento,
              fecha_registro: moment().format("YYYY-MM-D"),
              estado: 1,
              tipo: "cotizacion",
              precio_total: itemQuantitySum,
              fecha_entrega: "2022-09-17",
            };
            console.log(newItem);

            this.pedidosService.createPedido(newItem).subscribe((res: any) => {
              console.log("Respuesta de guardado del pedido: ", res);
              this.newCotizacionId = res.pedidoId;
            });
            console.log(this.items);

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
            //? se confirma el guardado
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Hecho!",
              text: "Se guardó la cotización",
              showConfirmButton: false,
              timer: 1000,
            });

            this.timer = false;
            this.router.navigate(['main/perfil-usuario']);
          }, 1500);
        });

      console.log(item);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal, intentalo de nuevo",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  //Buscar
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    const filterData = this.rows.filter((item: any) => {
      const filterData =
        item.nombre.toString().toLowerCase().includes(val);
      return filterData;
    });

    // update the rows
    this._filterRows = filterData;

    console.log(filterData);
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  //!************************** funcion de login *********************************
  userData: any;
  loginUser() {
    if (this.type === "cotizacion") {
      this.user.correo = this.loginForm.controls["correo"].value;
      this.user.contrasena = this.loginForm.controls["contrasena"].value;

      this.loginService.login(this.user).subscribe(
        (res: any) => {
          console.log(res);
          if (res.estado === 0) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Opps, Tu usuario esta desactivado, por favor comunicate a nuestros canales de atención.",
              showConfirmButton: true,
              confirmButtonText: "Ok",
            });
          } else {
            if (res.statusCode == 200) {
              console.log("Login exitoso");
              this.generarCotizacion(res);
              this.modalService.dismissAll();
              localStorage.setItem("token", res.token);
              localStorage.setItem("userId", res.userId);
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "El usuario o la contraseña son incorrectos",
              });
            }
          }

        }
      )
    } else if (this.type === "pedido") {
      this.user.correo = this.loginForm.controls["correo"].value;
      this.user.contrasena = this.loginForm.controls["contrasena"].value;

      this.loginService.login(this.user).subscribe((res: any) => {
        if (res.statusCode == 200) {
          console.log("Login exitoso");
          this.router.navigate(["main/pedidos/pago"]);
          this.modalService.dismissAll();
          localStorage.setItem("token", res.token);
          localStorage.setItem("userId", res.userId);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario o la contraseña son incorrectos",
          });
        }
      });
    }
  }
  //! ------------- VALIDACIONES DE CAMPOS Y BOTONES-------------

  validField(field: string) {
    return (
      this.loginForm.controls[field].errors &&
      this.loginForm.controls[field].touched
    );
  }

  filterList(): void {
    this.searchTerm$.subscribe(term => {
      this.listFiltered = this.products
        .filter(item => item.nombre.toLowerCase().indexOf(term.toLowerCase()) >= 0);
    });
  }
}

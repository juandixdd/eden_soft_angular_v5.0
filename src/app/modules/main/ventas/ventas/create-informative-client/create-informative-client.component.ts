import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesInformativosService } from 'app/modules/services/clientesInformativos/clientes-informativos.service';
import { DetalleVentaLocalService } from 'app/modules/services/detalleVentaLocal/detalle-venta-local.service';
import { ProductosService } from 'app/modules/services/productos/productos.service';
import { VentaLocalService } from 'app/modules/services/ventaLocal/venta-local.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-informative-client',
  templateUrl: './create-informative-client.component.html',
  styleUrls: ['./create-informative-client.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateInformativeClientComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private productosService: ProductosService,
    private clientesInformativosService: ClientesInformativosService,
    private ventaLocalService: VentaLocalService,
    private detalleVentaLocalService: DetalleVentaLocalService
  ) { }

  cedula: any = this.activatedRoute.snapshot.params.cedula;
  clientData: any = {};
  venta_local = {};
  detalleData = {}
  productsForm: any;
  selectBasic: any;
  productsDatabaseResponse: any;
  indexOfProduct: any;
  totalCost: any;
  timer: boolean = false;

  ngOnInit(): void {
    this.userForm.controls['id_cliente_documento'].setValue(this.cedula);
    this.getProductos()
  }

  public userForm: FormGroup = this.fb.group({
    id_cliente_documento: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    apellido: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    telefono: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],

  })

  validField(field: string) {
    return this.userForm.controls[field].errors &&
      this.userForm.controls[field].touched;
  }

  getProductos() {
    this.productosService.getData().subscribe((res: any) => {
      this.selectBasic = of(res).pipe();
      this.productsDatabaseResponse = res;
      console.log("Hola: ", this.selectBasic);
    });
  }

  eventListenerQuantity(event) {
    this.contar()
  }

  eventListener(event) {

    this.contar()

    //? Para asignarle un precio a cada producto
    let productId = event.id
    this.productsDatabaseResponse.forEach((element, index) => {
      if (element.id === productId) {
        this.indexOfProduct = index
      }
    });
    setTimeout(() => {
      this.productos.forEach((element, index) => {
        if (element.product.id === productId) {
          this.productos[index].itemCost = event.precio
        }
      })
      this.contar()
    }, 100);
    this.contar()
  }

  contar() {
    let prices = []
    this.productos.forEach((item, index) => {
      let mult = item.itemQuantity * item.itemCost
      prices.push(mult)
      this.totalCost = (prices.reduce((a, b) => a + b, 0))
    })
  }


  createVenta() {

    this.timer = true;

    this.clientData = {
      id_cliente_documento: this.userForm.value.id_cliente_documento,
      nombre: this.userForm.value.nombre,
      apellido: this.userForm.value.apellido,
      telefono: this.userForm.value.telefono
    }

    setTimeout(() => {
      this.venta_local = {
        id_cliente_documento: this.clientData.id_cliente_documento,
        fecha_registro: new Date().toISOString(),
        precio_total: this.totalCost,
        estado: 1
      }

      this.clientesInformativosService.createData(this.clientData).subscribe( //? Se guarda el cliente informativo
        (res: any) => {
          if (res.status === 200) {
            console.log("Cliente creado: ", res);
            console.log("venta Local: ", this.venta_local);
            this.ventaLocalService.createData(this.venta_local).subscribe(
              (res: any) => {
                if (res.status === 200) {
                  console.log("Venta creada");
                  let idVenta = res.data.insertId

                  this.productos.forEach((item, index) => { //? Se guardan los productos
                    let detalleVenta = {
                      id_producto: item.product.id,
                      id_venta: idVenta,
                      cantidad: item.itemQuantity,
                      precio_unitario: item.itemCost
                    }
                    this.detalleVentaLocalService.createData(detalleVenta).subscribe(
                      (res: any) => {
                        if (res.status === 200) {
                          console.log(res, "Producto creado");
                          Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Se ha agregado la venta',
                            showConfirmButton: false,
                            timer: 1500
                          })
                          this.router.navigate(['main/ventas']);
                        }
                      }
                    )
                  });



                } else {
                  console.log("No se creo la venta");

                }

              }
            )


          }
          else if (res.statusCode === 403) {

            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ya hay un cliente registrado con esta cedula'
            })

          }
        }
      )

      this.timer = false;
    }, 200);
  }

  /* 
  this.ventaLocalService.createData(this.venta_local).subscribe( //? Se guarda la venta
              (res: any) => {
                console.log("Venta: ", res);
                let idVenta = res.data.insertId;
                if (res.status === 200) {
                  this.productos.forEach((item, index) => { //? Se guardan los productos
                    let detalleVenta = {
                      id_producto: item.product.id,
                      id_venta: idVenta,
                      cantidad: item.itemQuantity,
                      precio_unitario: item.itemCost
                    }
                    this.detalleVentaLocalService.createData(detalleVenta).subscribe(
                      (res: any) => {
                        if (res.status === 200) {
                          console.log(res, "Producto creado");
                        }
                      }
                    )
                  });
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Se ha agregado la venta',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  this.router.navigate(['main/ventas']);
                } else {
                  console.log("No se guardo la venta");

                }

              },
              (err) => {
                console.log("Error");

              }
            ) */

  // public
  public productos = [];

  public producto = {
    product: '',
    itemQuantity: '',
    itemCost: ''
  };

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add producto
   */
  addItem() {
    this.productos.push({
      itemId: '',
      product: '',
      itemQuantity: '',
      itemCost: ''
    });
    this.contar()

  }

  /**
   * DeleteItem
   *
   * @param id
   */
  deleteItem(id) {
    this.contar()
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos.indexOf(this.productos[i]) === id) {
        this.productos.splice(i, 1);
        break;
      }
    }
    this.contar()
    if (this.productos.length === 0) {
      this.totalCost = 0;
    }
  }


}

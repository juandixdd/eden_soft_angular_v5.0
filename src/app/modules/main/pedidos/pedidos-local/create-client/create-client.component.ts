import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ClientesInformativosService } from 'app/modules/services/clientesInformativos/clientes-informativos.service';
import { DetallePedidoLocalService } from 'app/modules/services/detallePedidoLocal/detalle-pedido-local.service';
import { PedidoLocalService } from 'app/modules/services/pedidoLocal/pedido-local.service';
import { ProductosService } from 'app/modules/services/productos/productos.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class CreateClientComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private router: Router,
    private productosService: ProductosService,
    private clientesInformativosService: ClientesInformativosService,
    private pedidoLocalService: PedidoLocalService,
    private detallePedidoLocalService: DetallePedidoLocalService
  ) { }
  
  public basicDPdata: NgbDateStruct;
  totalCost: any;
  timer: boolean = false;
  pedido_local  = {};
  cedula: any = this.activatedRoute.snapshot.params.cedula;
  clientExists: any = parseInt(this.activatedRoute.snapshot.params.exist);
  clientData: any = {};
  indexOfProduct: any;
  productsDatabaseResponse: any;
  selectBasic: any;

  ngOnInit(): void {
    this.userForm.controls["id_cliente_documento"].setValue(this.cedula);
    this.getProductos();
    console.log(this.clientExists);

    if (this.clientExists === 1) {
      this.clientesInformativosService
        .getDataById(this.cedula)
        .subscribe((res: any) => {
          console.log(res);
          this.userForm.controls["nombre"].setValue(res[0].nombre);
          this.userForm.controls["apellido"].setValue(res[0].apellido);
          this.userForm.controls["telefono"].setValue(res[0].telefono);
          this.userForm.disable();
        });
    }
  }

  public userForm: UntypedFormGroup = this.fb.group({
    id_cliente_documento: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    apellido: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    telefono: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  });

  public fechaForm: UntypedFormGroup = this.fb.group({
    fecha_entrega: [
      "",
      [Validators.required]
    ]
    
  })


  validField(field: string) {
    return (
      this.userForm.controls[field].errors &&
      this.userForm.controls[field].touched
    );
  }

  

  validFields(field: string){
    return ( this.fechaForm.controls[field].errors && 
      this.fechaForm.controls[field].touched);
  }

  getProductos() {
    this.productosService.getData().subscribe((res: any) => {
      this.selectBasic = of(res).pipe();
      this.productsDatabaseResponse = res;
      console.log("Hola: ", this.selectBasic);
    });
  }

  eventListenerQuantity(event) {
    this.contar();
  }

  eventListener(event) {
    this.contar();

    //? Para asignarle un precio a cada producto
    let productId = event.id;
    this.productsDatabaseResponse.forEach((element, index) => {
      if (element.id === productId) {
        this.indexOfProduct = index;
      }
    });
    setTimeout(() => {
      this.productos.forEach((element, index) => {
        if (element.product.id === productId) {
          this.productos[index].itemCost = event.precio;
        }
      });
      this.contar();
    }, 100);
    this.contar();
  }

  contar() {
    let prices = [];
    this.productos.forEach((item, index) => {
      let mult = item.itemQuantity * item.itemCost;
      prices.push(mult);
      this.totalCost = prices.reduce((a, b) => a + b, 0);
    });
  }

  createPedidoLocal() {
    if (this.clientExists === 0) {
      this.timer = true;

      this.clientData = {
        id_cliente_documento: this.userForm.value.id_cliente_documento,
        nombre: this.userForm.value.nombre,
        apellido: this.userForm.value.apellido,
        telefono: this.userForm.value.telefono,
        
      };

      setTimeout(() => {
        this.pedido_local = {
          id_cliente_documento: this.clientData.id_cliente_documento,
          fecha_registro: new Date().toISOString(),
          precio_total: this.totalCost,
          estado: 1,
          fecha_entrega: this.basicDPdata.year + "-" + this.basicDPdata.month + "-" + this.basicDPdata.day.toString()
          
        };

        this.clientesInformativosService.createData(this.clientData).subscribe(
          //? Se guarda el cliente informativo
          (res: any) => {
            if (res.status === 200) {
              console.log("Cliente creado: ", res);
              console.log("Pedido local: ", this.pedido_local);
              this.pedidoLocalService
                .createData(this.pedido_local)
                .subscribe((res: any) => {
                  if (res.status === 200) {
                    console.log("Pedido creado 1");
                    let idPedido = res.data.insertId;

                    this.productos.forEach((item, index) => {
                      //? Se guardan los productos
                      let detallePedidoLocal = {
                        id_producto: item.product.id,
                        id_pedido_local: idPedido,
                        cantidad: item.itemQuantity,
                        precio_unitario: item.itemCost,
                      };
                      this.detallePedidoLocalService
                        .createData(detallePedidoLocal)
                        .subscribe((res: any) => {
                          if (res.status === 200) {
                            console.log(res, "Producto creado");
                            Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "Se ha agregado el pedido local",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                            this.router.navigate(["main/pedidos-local"]);
                          }
                        });
                    });
                  } else {
                    console.log("No se creo el pedido");
                  }
                });
            } else if (res.statusCode === 403) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ya hay un cliente registrado con esta cedula",
              });
            }
          }
        );

        this.timer = false;
      }, 200);
    } else if (this.clientExists === 1) {
      this.timer = true;
      this.pedido_local = {
        id_cliente_documento: this.cedula,
        fecha_registro: new Date().toISOString(),
        precio_total: this.totalCost,
        estado: 1,
        fecha_entrega: this.basicDPdata.year + "-" + this.basicDPdata.month + "-" + this.basicDPdata.day.toString()

      };
      setTimeout(() => {
        this.pedidoLocalService
          .createData(this.pedido_local)
          .subscribe((res: any) => {
            if (res.status === 200) {
              console.log("Pedido creado 2");
              console.log(this.pedido_local);
              
              let idPedido = res.data.insertId;

              this.productos.forEach((item, index) => {
                //? Se guardan los productos
                let detallePedidoLocal = {
                  id_producto: item.product.id,
                  id_pedido_local: idPedido,
                  cantidad: item.itemQuantity,
                  precio_unitario: item.itemCost,
                };
                
                
                this.detallePedidoLocalService
                  .createData(detallePedidoLocal)
                  .subscribe((res: any) => {
                    
                    if (res.status === 200) {
                      console.log(res, "Producto creado");

                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Se ha agregado el pedido local",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      this.router.navigate(["main/pedidos-local"]);
                    }
                  });
              });
            } else {
              console.log("No se creo el pedido");
            }
          });

        this.timer = false;
      }, 200);
    }
  }

  public productos = [];

  public producto = {
    product: "",
    itemQuantity: "",
    itemCost: "",
  };

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add producto
   */
  addItem() {
    this.productos.push({
      itemId: "",
      product: "",
      itemQuantity: "",
      itemCost: "",
    });
    this.contar();
  }

  /**
   * DeleteItem
   *
   * @param id
   */
  deleteItem(id) {
    this.contar();
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos.indexOf(this.productos[i]) === id) {
        this.productos.splice(i, 1);
        break;
      }
    }
    this.contar();
    if (this.productos.length === 0) {
      this.totalCost = 0;
    }
  }

  dateEvent({ target }) {
    console.log(target);

  }

}

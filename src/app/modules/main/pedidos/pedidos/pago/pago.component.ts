import { Component, OnInit } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { PedidosService } from "app/modules/services/pedidos/pedidos.service";

@Component({
  selector: "app-pago",
  templateUrl: "./pago.component.html",
  styleUrls: ["./pago.component.scss"],
})
export class PagoComponent implements OnInit {
  // public
  public items = JSON.parse(localStorage.getItem("wishList"));
  public basicDPdata: NgbDateStruct;
  newItems: any;
  precioTotal: any = 0;



  constructor(
    private pedidosService: PedidosService,

  ) { }





  ngOnInit(): void {
    this.calcularPrecioUnitario();
    this.newItems.forEach(item => {
      this.precioTotal += item.subtotal;
      console.log(this.newItems);

    });

  }

  public item = {
    itemName: "",
    itemQuantity: "",
    itemCost: "",
  };

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

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

  calcularPrecioUnitario() {
    this.newItems = this.items.map((item) => ({ ...item, subtotal: parseInt(item.itemQuantity) * item.itemPrice }));
    console.log(this.newItems);
  }

  onChange({ target }, name) {
    let indice = this.newItems.findIndex((element) => element.itemName === name);
    let item = this.newItems.find((element) => element.itemName === name);
    item = { ...item, subtotal: item.itemQuantity * item.itemPrice };
    console.log(item);
    this.newItems.splice(indice, 1, item)

  }

  generarPedido() {
    try {
      let pedido = {
        id_cliente_documento: parseInt(localStorage.getItem("userId")),
        tipo: "pedido",
        fecha_registro: new Date().toISOString(),
        precio_total: this.precioTotal,
        estado: 1,
        fecha_entrega: this.basicDPdata.year + "-" + this.basicDPdata.month + "-" + this.basicDPdata.day.toString()
      }

      this.pedidosService.createPedido(pedido).subscribe(
        (res: any) => {
          console.log(res);
          this.newItems.forEach((item, index) => {
            let detalle_pedido = {
              id_producto: item.itemId,
              id_pedido: res.pedidoId,
              cantidad: item.itemQuantity,
              precio_unitario: item.itemPrice
            }

            this.pedidosService.createDetalle(detalle_pedido).subscribe(
              (res: any) => {
                console.log(res);

              }
            )

          })

        }
      )
    } catch (error) {
      console.log(error);

    }

  }


  dateEvent({ target }) {
    console.log(target);

  }
}

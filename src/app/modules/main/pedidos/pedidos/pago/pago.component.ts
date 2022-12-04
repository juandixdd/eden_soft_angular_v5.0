import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbDateStruct, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PedidosService } from "app/modules/services/pedidos/pedidos.service";
import Swal from "sweetalert2";

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
  timer: boolean = false;
  type: string = "";

  constructor(
    private pedidosService: PedidosService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.calcularPrecioUnitario();
    this.newItems.forEach(item => {
      this.precioTotal += item.subtotal;
      console.log(this.newItems);

    });

  }

  public pagoForm: UntypedFormGroup = this.fb.group({
    fecha_pago: [
      "",
      [Validators.required]
    ]
    
  })

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
          this.newItems.forEach((item, index) => { setTimeout(() =>{
            let detalle_pedido = {
              id_producto: item.itemId,
              id_pedido: res.pedidoId,
              cantidad: item.itemQuantity,
              precio_unitario: item.itemPrice
            }

            this.pedidosService.createDetalle(detalle_pedido).subscribe(
              (res: any) => {
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
          text: "Se guardó el pedido",
          showConfirmButton: false,
          timer: 1000,
        });

        this.timer = false;
        this.router.navigate(["main/pedidos/perfil-usuario"]);
        console.log(this.item);

    } catch (error) {
      console.log(error);
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

  
  dateEvent({ target }) {
    console.log(target);

  }

  validField(field: string){
    return this.pagoForm.controls[field].errors && 
      this.pagoForm.controls[field].touched
  }

  modalOpen(modal, tipo) {
    //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
    this.type = tipo;
  }
}

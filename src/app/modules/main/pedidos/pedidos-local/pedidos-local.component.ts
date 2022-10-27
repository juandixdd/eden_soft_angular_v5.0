import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ClientesInformativosService } from 'app/modules/services/clientesInformativos/clientes-informativos.service';
import { PedidoLocalService } from 'app/modules/services/pedidoLocal/pedido-local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos-local',
  templateUrl: './pedidos-local.component.html',
  styleUrls: ['./pedidos-local.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class PedidosLocalComponent implements OnInit {
  public selectedOption = 10; //? Este es el selector de cuantas filas quieres ver en la tabla, en este caso, 10.
  public ColumnMode = ColumnMode; //? Esto es para que cuando selecciones una fila, se seleccione la fila y no el boton.
  private tempData = []; //? Estas son cosas del buiscador (Que no funciona)
  public kitchenSinkRows: any;

  loader: boolean = false;
  clientCedulaInfo: any;
  clientData: any;
  pedidoData: any;
  rows: any = [];
  products: any[] = [];


  constructor(
    private modalService: NgbModal,
    private pedidoLocalService: PedidoLocalService,
    private clientesInformativosService: ClientesInformativosService,
    private fb: FormBuilder,
    private router: Router
  ) {}


  public cedulaForm: FormGroup = this.fb.group({
    cedula: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  });


  public switchForm: FormGroup = this.fb.group({
    estado: [],
  });


  ngOnInit(): void {
    this.getPedidosLocales();
  
    
  }


  modalOpen(modal) {
    //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }


  getPedidosLocales(){
    this.pedidoLocalService.getData().subscribe((res: any) =>  {
      res.forEach((item) => {
        console.log(item);
        
        item.formcontrol  =  new FormControl(item.estado);
        this.switchForm.addControl(item.id_pedido_local, item.formcontrol);
      });
      this.rows = res;
    });
  }


  validateClient() {
    this.loader = true;
    this.clientCedulaInfo = { cedula: this.cedulaForm.value.cedula };
    console.log(this.clientCedulaInfo);

    setTimeout(() => {
      this.clientesInformativosService
        .getDataById(this.clientCedulaInfo.cedula)
        .subscribe((res: any) => {
          if (res.length === 0) {
            this.router.navigate([
              "main/pedidos-locales/create-client",
              this.clientCedulaInfo.cedula,
              0,
            ]);
            this.modalService.dismissAll();
          } else {
            this.router.navigate([
              "main/pedidos-locales/create-client",
              this.clientCedulaInfo.cedula,
              1,
            ]);
            this.modalService.dismissAll();
          }
        });
      this.loader = false;
    }, 500);
  }

  createInformativeClient() {
    console.log("Crear cliente informativo con cc: ", this.clientCedulaInfo);
    this.modalService.dismissAll();
    this.router.navigate([
      "main/pedidos-locales/create-client",
      this.clientCedulaInfo.cedula,
    ]);
  }

  defineProductInfo(id) {
    this.products = [];
    this.pedidoLocalService.getAllDetallePedidoData(id).subscribe((res: any) => {
      this.clientData = {
        nombre: res[0].nombre,
        apellido: res[0].apellido,
        id_cliente_documento: res[0].id_cliente_documento,
        telefono: res[0].telefono,
      };
      this.pedidoData = {
        fecha_registro: res[0].fecha_registro,
        fecha_entrega: res[0].fecha_entrega,
        precio_total: res[0].precio_total,
        estado: res[0].estado,
      };
      res.forEach((item) => {
        this.products.push(item);
      });

      console.log(this.clientData);
      console.log(this.pedidoData);
      console.log(this.products);
    });
  }

  switchEvent({ target }, row) {
    let checked = target.checked;
    let status = {
      estado: checked,
    };

    if (checked) {
      Swal.fire({
        icon: "warning",
        confirmButtonText: "Ok",
        title: "Opps, no se puede volver a activar un pedido local",
      });
      this.getPedidosLocales();
    } else {
      setTimeout(() => {
        Swal.fire({
          title: "¿Estas seguro?",
          text: "Esta acción no se puede revertir",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Cambiar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            this.pedidoLocalService
              .anularPedidoLocal(row.id_venta, status)
              .subscribe((res: any) => {
                if (res.status === 200) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Se cambió el estado del pedido",
                    showConfirmButton: false,
                    timer: 1000,
                  });
                  this.getPedidosLocales();
                }
              });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "warning",
              title: "No se cambió el estado del pedido",
              showConfirmButton: false,
              timer: 1000,
            });
            this.getPedidosLocales();
          }
        });
      }, 100);
    }
  }


}

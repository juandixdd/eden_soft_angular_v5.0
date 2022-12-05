import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  _filterRows: any = [];

  constructor(
    private modalService: NgbModal,
    private pedidoLocalService: PedidoLocalService,
    private clientesInformativosService: ClientesInformativosService,
    private fb: UntypedFormBuilder,
    private router: Router
  ) {}


  public cedulaForm: UntypedFormGroup = this.fb.group({
    cedula: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  });


  public switchForm: UntypedFormGroup = this.fb.group({
    estado: [],
  });


  ngOnInit(): void {
    this.getPedidosLocales();
  }

   //! ------------- GET Y SET PARA EL BUSCADOR ------------- 
   get filterRows(): any {
    return this._filterRows;
  }

  set filterRows(value) {
    this._filterRows = value;
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
        item.formcontrol  =  new UntypedFormControl(item.estado);
        this.switchForm.addControl(item.id_pedido_local, item.formcontrol);
      });
      this.rows = res;
      this.filterRows = res;
      console.log(res);
      
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
              "main/pedidos-local/create-client",
              this.clientCedulaInfo.cedula,
              0,
            ]);
            this.modalService.dismissAll();
          } else {
            this.router.navigate([
              "main/pedidos-local/create-client",
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
      "main/pedidos-local/create-client",
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
        estado: res[0].estado_pedido,
        cantidad_abono: res[0].cantidad_abono,
        faltante: res[0].precio_total - res[0].cantidad_abono,
        estado_abono: res[0].estado_abono,
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
      estado: checked ? 1 : 0,
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
            console.log("Cancelar");
            console.log(row.id_pedido_local);
            console.log(status);

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
  reloadPage() {
    setTimeout(() => {
      this.router
        .navigate(["/main/pedidos-local"])
        .then(() => window.location.reload());
    }, 1000);
  }

  selectEvent({ target }, idPedido) {
    const successAlert = (message) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${message}`,
        showConfirmButton: false,
        timer: 1000,
      });
    };

    const warningAlert = (message) => {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: `${message}`,
        showConfirmButton: false,
        timer: 1000,
      });
    };

    let reqBody = {
      estado: target.value,
    };

    // ? Se inactiva el pedido
    if (reqBody.estado == 0) {
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
            .anularPedidoLocal(idPedido, reqBody)
            .subscribe((res: any) => {
              if (res.status == 200) {
                successAlert("Se anuló el pedido");
                this.reloadPage();
              } else {
                warningAlert(
                  "Ops! Hubo un error interno, por favor inténtelo de nuevo"
                );
                this.reloadPage();
              }
            });
        } else {
          warningAlert("No se inactivó el pedido");
          this.reloadPage();
        }
      });
    }
    // ? Se cambia a pagado
    if (reqBody.estado == 1) {
      Swal.fire({
        title: "¿Estas seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Cambiar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.pedidoLocalService
            .anularPedidoLocal(idPedido, reqBody)
            .subscribe((res: any) => {
              if (res.status == 200) {
                let abonoBody = {
                  estado: 0,
                };
                this.pedidoLocalService
                  .anularAbono(idPedido, abonoBody)
                  .subscribe((res: any) => {
                    if (res.status == 200) {
                      successAlert(
                        "Se actualizó el estado del pedido y se inactivó el abono"
                      );
                      this.reloadPage();
                    } else {
                      warningAlert(
                        "Ops! Hubo un error interno, por favor inténtelo de nuevo"
                      );
                      this.reloadPage();
                    }
                  });
              } else {
                warningAlert(
                  "Ops! Hubo un error interno, por favor inténtelo de nuevo"
                );
                this.reloadPage();
              }
            });
        } else {
          warningAlert("No se cambió el estado del pedido");
          this.reloadPage();
        }
      });
    }

    // ? Se restringe el abono
    if (reqBody.estado == 2) {
      warningAlert("No se puede abonar a un pedido pagado");
      this.reloadPage();
    }
  }

  validField(field: string) {
    return (
      this.cedulaForm.controls[field].errors &&
      this.cedulaForm.controls[field].touched
    );
  }

  //! ------------- BUSCADOR DE PEDIDOS ------------- 
filterUpdate(event) {
  const val = event.target.value.toLowerCase();

  const filterData = this.rows.filter((item: any) => {
    const filterData =
    item.id_pedido_local.toString().toLowerCase().includes(val) ||
    item.nombre.toString().toLowerCase().includes(val) || 
    item.precio_total.toString().toLowerCase().includes(val) ||
    item.fecha_entrega.toLowerCase().includes(val) ||
    item.fecha_registro.toLowerCase().includes(val); 
    return filterData;
  });

  // update the rows
  this.filterRows = filterData;

  console.log(filterData);
}
}
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { ClientesInformativosService } from "app/modules/services/clientesInformativos/clientes-informativos.service";
import { UsersService } from "app/modules/services/users/users.service";
import { VentaLocalService } from "app/modules/services/ventaLocal/venta-local.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-ventas",
  templateUrl: "./ventas.component.html",
  styleUrls: ["./ventas.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class VentasComponent implements OnInit {
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  private tempData = [];
  public kitchenSinkRows: any;

  validateButton: boolean = true;
  loader: boolean = false;
  clientCedulaInfo: any;
  clientData: any;
  ventaData: any;
  products: any[] = [];
  isInformative: boolean = false;
  isUser: boolean = false;
  createInformativeClientButton: boolean = false;
  _filterRows: any = [];

  rows: any = [];

  constructor(
    private modalService: NgbModal,
    private ventaLocalService: VentaLocalService,
    private usersService: UsersService,
    private clientesInformativosService: ClientesInformativosService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  public cedulaForm: FormGroup = this.fb.group({
    cedula: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.min(1)],
    ],
  });

  public switchForm: FormGroup = this.fb.group({
    estado: [],
  });

  public switchFormPago: FormGroup = this.fb.group({
    pago: [],
  });

  ngOnInit(): void {
    this.getVentasLocales();
  }

  //? Get y Set para el buscador
  get filterRows(): any {
    return this._filterRows;
  }

  set filterRows(value) {
    this._filterRows = value;
  }

  modalOpen(modal) {
    this.modalService.open(modal, {
      centered: true,
    });
  }

  getVentasLocales() {
    this.ventaLocalService.getData().subscribe((res: any) => {
      res.forEach((item) => {
        item.formcontrol = new FormControl(item.estado);
        this.switchForm.addControl(item.id_venta, item.formcontrol);
      });
      res.forEach((item) => {
        item.formcontrol2 = new FormControl(item.pagado);
        this.switchFormPago.addControl(item.id_venta, item.formcontrol2);
      });
      this.rows = res;
      this.filterRows = res;
      console.log(res);
    });
  }

  createVenta() {
    console.log("Funcion de crear venta");
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
              "main/ventas/create-client",
              this.clientCedulaInfo.cedula,
              0,
            ]);
            this.modalService.dismissAll();
          } else {
            this.router.navigate([
              "main/ventas/create-client",
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
      "main/ventas/create-client",
      this.clientCedulaInfo.cedula,
    ]);
  }

  defineProductInfo(id) {
    this.products = [];
    this.ventaLocalService.getAllDetalleVentaData(id).subscribe((res: any) => {
      this.clientData = {
        nombre: res[0].nombre,
        apellido: res[0].apellido,
        id_cliente_documento: res[0].id_cliente_documento,
        telefono: res[0].telefono,
      };
      this.ventaData = {
        fecha_registro: res[0].fecha_registro,
        precio_total: res[0].precio_total,
        estado: res[0].estado,
      };
      res.forEach((item) => {
        this.products.push(item);
      });

      console.log(this.clientData);
      console.log(this.ventaData);
      console.log(this.products);
    });
  }

  switchEvent({ target }, row) {
    let checked = target.checked;
    let status = {
      estado: checked ? 1 : 0,
    };

    console.log(checked);


    if (checked) {
      Swal.fire({
        icon: "warning",
        confirmButtonText: "Ok",
        title: "Opps, no se puede volver a activar una venta local",
      });
      this.getVentasLocales();
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
            console.log(row.id_venta);
            console.log(status);


            // this.ventaLocalService
            //   .anularVentaLocal(row.id_venta, status)
            //   .subscribe((res: any) => {
            //     if (res.status === 200) {
            //       Swal.fire({
            //         position: "top-end",
            //         icon: "success",
            //         title: "Se cambió el estado de la venta",
            //         showConfirmButton: false,
            //         timer: 1000,
            //       });
            //       this.getVentasLocales();
            //     }
            //   });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "warning",
              title: "No se cambió el estado de la venta",
              showConfirmButton: false,
              timer: 1000,
            });
            this.getVentasLocales();
          }
        });
      }, 100);
    }
  }

  switchEventPago({ target }, row) {
    let checked = target.checked;
    let status = {
      pagado: checked ? 1 : 0,
    };

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
        this.ventaLocalService
          .cambiarEstadoDePago(row.id_venta, status)
          .subscribe((res: any) => {
            console.log(res);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Se cambió el estado de la venta",
              showConfirmButton: false,
              timer: 1000,
            });
            this.getVentasLocales();
          });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "No se cambió el estado de la venta",
          showConfirmButton: false,
          timer: 1000,
        });
        this.getVentasLocales();
      }
    });
  }

  validField(field: string) {
    return (
      this.cedulaForm.controls[field].errors &&
      this.cedulaForm.controls[field].touched
    );
  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    const filterData = this.rows.filter((item: any) => {
      const filterData =
        item.precio_total.toString().toLowerCase().includes(val) ||
        item.fecha_registro.toString().toLowerCase().includes(val) ||
        item.estado_data.toString().toLowerCase().includes(val);
      return filterData;
    });

    // update the rows
    this.filterRows = filterData;

    console.log(filterData);
  }
}

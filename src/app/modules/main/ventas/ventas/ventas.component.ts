import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ClientesInformativosService } from 'app/modules/services/clientesInformativos/clientes-informativos.service';
import { UsersService } from 'app/modules/services/users/users.service';
import { VentaLocalService } from 'app/modules/services/ventaLocal/venta-local.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class VentasComponent implements OnInit {

  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  private tempData = [];
  public kitchenSinkRows: any;

  validateButton: boolean = true
  loader: boolean = false
  clientCedulaInfo: any;
  clientData: any;
  ventaData: any;
  products: any[] = [];
  isInformative: boolean = false;
  isUser: boolean = false;
  createInformativeClientButton: boolean = false;

  rows: any = []

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
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  });

  public switchForm: FormGroup = this.fb.group({
    estado: []
  })

  ngOnInit(): void {
    this.getVentasLocales();
  }

  modalOpen(modal) {
    this.modalService.open(modal, {
      centered: true,
    });
  }

  getVentasLocales() {
    this.ventaLocalService.getData().subscribe(
      (res: any) => {
        res.forEach((item) => {
          item.formcontrol = new FormControl(item.estado);
          this.switchForm.addControl(item.id_venta, item.formcontrol)
        })
        this.rows = res
      }
    )
  }

  createVenta() {
    console.log("Funcion de crear venta")
  }

  validateClient() {
    this.loader = true;
    this.clientCedulaInfo = { cedula: this.cedulaForm.value.cedula }
    console.log(this.clientCedulaInfo);

    setTimeout(() => {
      this.loader = false;
      this.usersService.getDataById(this.clientCedulaInfo.cedula).subscribe(
        (res: any) => {
          if (res.status === 400) {
            console.log("No existe en la tabla de usuarios");
            this.clientesInformativosService.getDataById(this.clientCedulaInfo.cedula).subscribe(
              (res: any) => {
                if (res.length === 0) {
                  console.log("Tampoco existe en clientes informativos");
                  this.createInformativeClientButton = true
                }
                else {
                  console.log(res);


                }
              }
            )

          }
          else {
            console.log("Existe en la tabla de usuarios");
            console.log(res);
            this.isInformative = false;
            this.isUser = true


          }
        }
      )

    }, 500);

    /* setTimeout(() => {
      this.usersService.getDataById(this.clientCedulaInfo.cedula).subscribe(
        (res: any) => {
          if (res.status === 400) {
            this.clientDontExist = true;
            this.clientExist = false;
            this.validateButton = false;

            console.log("No existe");

          } else {
            this.clientExist = true;
            this.clientDontExist = false;
            this.validateButton = false;

            console.log("Existe");

          }
        }
      )
      this.loader = false;
    }, 1000) */
  }

  createInformativeClient() {
    console.log("Crear cliente informativo con cc: ", this.clientCedulaInfo);
    this.modalService.dismissAll();
    this.router.navigate(['main/ventas/create-client', this.clientCedulaInfo.cedula]);
  }

  defineProductInfo(id) {
    this.products = []
    this.ventaLocalService.getAllDetalleVentaData(id).subscribe(
      (res: any) => {
        this.clientData = {
          nombre: res[0].nombre,
          apellido: res[0].apellido,
          id_cliente_documento: res[0].id_cliente_documento,
          telefono: res[0].telefono
        }
        this.ventaData = {
          fecha_registro: res[0].fecha_registro,
          precio_total: res[0].precio_total,
          estado: res[0].estado
        }
        res.forEach((item) => {
          this.products.push(item)
        })

        console.log(this.clientData);
        console.log(this.ventaData);
        console.log(this.products);

      }
    )

  }

  anularVenta(row) {
  }

  switchEvent({ target }, row) {
    let checked = target.checked;
    let status = {
      estado: checked
    }

    setTimeout(() => {

      Swal.fire({
        title: '¿Estas seguro?',
        text: "Cambiarás el estado de la venta",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cambiar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.ventaLocalService.anularVentaLocal(row.id_venta, status).subscribe(
            (res: any) => {
              if (res.status === 200) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Se cambió el estado de la venta',
                  showConfirmButton: false,
                  timer: 1000
                })
                this.getVentasLocales();
              }

            })
        }
        else {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'No se cambió el estado de la venta',
            showConfirmButton: false,
            timer: 1000
          })
          this.getVentasLocales();



        }
      })

    }, 100);

  }


}


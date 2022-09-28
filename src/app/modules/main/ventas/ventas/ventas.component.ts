import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
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

  clientDontExist: boolean = false
  clientExist: boolean = false
  validateButton: boolean = true
  loader: boolean = false
  clientCedulaInfo: any;
  clientData: any;
  ventaData: any;
  products: any[] = [];

  rows: any = []

  constructor(
    private modalService: NgbModal,
    private ventaLocalService: VentaLocalService,
    private usersService: UsersService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  public cedulaForm: FormGroup = this.fb.group({
    cedula: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  });

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
    }, 1000)
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
          precio_total: res[0].precio_total
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
}


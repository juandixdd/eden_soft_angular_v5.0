import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  rows: any = []

  constructor(
    private modalService: NgbModal,
    private ventaLocalService: VentaLocalService,
    private usersService: UsersService,
    private fb: FormBuilder
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
    let clientInfo = { cedula: this.cedulaForm.value.cedula }
    console.log(clientInfo);

    setTimeout(() => {
      this.usersService.getDataById(clientInfo.cedula).subscribe(
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


}


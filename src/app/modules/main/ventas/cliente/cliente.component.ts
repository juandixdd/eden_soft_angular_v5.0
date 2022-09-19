import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ClientesInformativosService } from 'app/modules/services/clientesInformativos/clientes-informativos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClienteComponent implements OnInit {

  public kitchenSinkRows: any;
  public selectedOption = 10;
  private tempData = [];
  public ColumnMode = ColumnMode;

  rows: any = []

  constructor(
    private modalService: NgbModal,
    private clientesInformativosService: ClientesInformativosService
  ) { }

  ngOnInit(): void {
    this.tempData = this.rows;
    this.kitchenSinkRows = this.rows;
    this.getClientes();
  }

  modalOpen(modal) {
    this.modalService.open(modal, {
      centered: true,
    });
  }

  getClientes() {
    this.clientesInformativosService.getData().subscribe(
      (res: any) => {
        this.rows = res;
        console.log(res);

      }
    )
  }

  confirmAlert() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminada!',
          'El cliente ha sido eliminada.',
          'success'
        )
      }
    })
  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.tempData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
  }


}

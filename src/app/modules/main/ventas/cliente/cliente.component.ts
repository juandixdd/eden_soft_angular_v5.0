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


}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
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

  rows: any = [


  ]

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  modalOpen(modal) {
    this.modalService.open(modal, {
      centered: true,
    });
  }

}

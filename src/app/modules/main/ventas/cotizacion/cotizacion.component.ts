import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss'],
  encapsulation: ViewEncapsulation.None /* ? */
})
export class CotizacionComponent implements OnInit {

  public selectedOption = 10; /* ? */
  public ColumnMode = ColumnMode; /* ? */
  private tempData = [];
  public kitchenSinkRows: any;

  selectBasic = [
    'Buñuelo',
    'Palito de queso',
    'Arepa de huevo',
  ]

  rows: any = [
    {
      id: 1,
      delivery_date: '2022-12-12',
      status: 'Pendiente',
    },
    {
      id: 2,
      delivery_date: '2022-09-13',
      status: 'Pagado',

    }
  ]; //? Estos son los datos de la tabla quemados

  constructor(
    private modalService: NgbModal, /* ? */
  ) { }

  ngOnInit(): void {
    this.tempData = this.rows;
    this.kitchenSinkRows = this.rows;
  }

  modalOpen(modal) { /* ? */
    this.modalService.open(modal, {
      centered: true,
    });
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
          'La cotización ha sido eliminada.',
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

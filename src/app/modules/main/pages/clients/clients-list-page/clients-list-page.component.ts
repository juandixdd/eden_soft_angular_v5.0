import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ClientsService } from 'app/modules/main/services/clients/clients.service';
import moment from 'moment';
import Swal from 'sweetalert2';
import { Client } from '../../../../../core/models/client';


@Component({
  selector: 'app-clients-list-page',
  templateUrl: './clients-list-page.component.html',
  styleUrls: ['./clients-list-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientsListPageComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;

  rows: any = [];
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  data: any = [];
  cols: any = [];
  public searchValue = '';
  public selectedStatus = [];
  private tempData: any = [];

  selectMulti: any;
  selectMultiSelected: any;
  selectMultiSelectedEvent: any;
  hasMembership: boolean = false;
  client_id: any;
  edit: boolean = false;
  dateStartSelected: any;
  basicDPdata: any;

  client: Client = {
    name: "",
    last_name: "",
    telephone: "",
    height: undefined,
    weight: undefined,
    goal: "",
    start_date: "",
    finish_date: ""
  }

  constructor(
    public customeService: ClientsService,
    private router: Router,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private clientsService: ClientsService
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
    this.clientsService.getData().subscribe((res) => {
      this.rows = res;
      this.tempData = res;
    });
  }



  createClient() {
    Swal.fire({
      title: 'Crear Cliente',
      html: `<input type="text" id="name" class="swal2-input" placeholder="Nombre">
             <input type="text" id="last_name" class="swal2-input" placeholder="Apellido">
             <input type="text" id="telephone" class="swal2-input" placeholder="Telefono">`,
      confirmButtonText: 'Crear',
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name')['value'];
        const last_name = Swal.getPopup().querySelector('#last_name')['value'];
        const telephone = Swal.getPopup().querySelector('#telephone')['value'];
        if (!name || !last_name || !telephone) {
          Swal.showValidationMessage(`Por favor validar todos los campos`)
          return false;
        }
        else {
          return {
            name: name,
            last_name: last_name,
            telephone: telephone,
          }
        }
      }
    }).then((result) => {
      console.log(result.value);
      if (result.value) {
        this.customeService.addClient(result.value).subscribe((resp) => {
          console.log(resp);
          let data: any = resp;
          this.router.navigate([`/clients/edit/${data.id}`]);
        })
      }
    })
  }

  confirmDeleteClient(id: number) {
    Swal.fire({
      title: '¿Seguro?',
      text: "Esta acción eliminará el gimnasio",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Eliminar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.customeService.deleteClient(id).subscribe((data) => {
          const resp: any = data;
          if (resp.status) {
            Swal.fire(
              'Eliminado!',
              'El cliente ha sido eliminado.',
              'success'
            );
            console.log(`Gimnasio eliminado`);
            this.ngOnInit();
          } else {
            console.log('Error');
          }

        });
      }
    })
  }


  // modal Open Form
  modalOpenForm(modalForm) {
    this.modalService.open(modalForm);
  }

  modalOpenEdit(modalEdit) {
    this.modalService.open(modalEdit);
  }


  public clientForm: FormGroup = this.fb.group({
    name: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    last_name: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    telephone: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    height: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    weight: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    goal: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    start_date: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],

  });

  validField(field: string) {
    return this.clientForm.controls[field].errors &&
      this.clientForm.controls[field].touched;
  }

  saveNewClient() {
    this.clientsService.addClient(this.client).subscribe(
      (res) => {
        let data: any = res;
        console.log(res);
        this.ngOnInit();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El cliente ha sido creado',
          showConfirmButton: false,
          timer: 1000
        })
      },
      (err) => console.log(err)
    );
  }



  updateClient(id) {
    this.clientsService.updateClient(this.client.id, this.client).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }


  addDate() {
    if (!this.hasMembership && this.selectMultiSelected != null && this.selectMultiSelectedEvent != null) {

      let dateFinishSelected = this.dateStartSelected + this.selectMultiSelectedEvent.time_lapse;

      this.selectMultiSelectedEvent.time_lapse
      this.basicDPdata

      // se suma this.selectMultiSelectedEvent.time_lapse a la fecha de inicio
      const finishDate = moment("2021-01-15", "YYYY-MM-DD").add(this.selectMultiSelectedEvent.time_lapse, 'days').format('YYYY-MM-DD');
      console.log(finishDate);

      const record = {
        date_start: this.basicDPdata.year + "-" + this.basicDPdata.month + "-" + this.basicDPdata.day,
        date_finish: finishDate,
        clients: {
          id: this.client.id,
        },
        memberships: {
          id: this.selectMultiSelectedEvent.id
        }

      }
    }
  }

}

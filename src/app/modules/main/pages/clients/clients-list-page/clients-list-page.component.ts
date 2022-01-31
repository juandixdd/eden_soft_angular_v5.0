import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, id } from '@swimlane/ngx-datatable';
import { ClientsService } from 'app/modules/main/services/clients/clients.service';
import moment from 'moment';
import Swal from 'sweetalert2';
import { Client } from '../../../../../core/models/client';
import { MembershipsRecordsService } from 'app/modules/main/services/memberships-records/memberships-records.service';
import { MembershipsService } from 'app/modules/main/services/memberships/memberships.service';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Membership } from '../../../../../core/models/membership';
import { MembershipRecord } from 'app/core/models/membership-record';


@Component({
  selector: 'app-clients-list-page',
  templateUrl: './clients-list-page.component.html',
  styleUrls: ['./clients-list-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientsListPageComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;

  rows: any = [];
  data: any = [];
  cols: any = [];
  rowId: number;
  clientGoal: string;
  clientDateStart: string;
  membershipTimeLapse: number;
  clientInfo: any;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
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
  addSede: boolean = false;
  clientMembership: Object;
  membershipID: any;

  constructor(
    public customeService: ClientsService,
    private router: Router,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private clientsService: ClientsService,
    private membershipsRecordsService: MembershipsRecordsService,
    private membershipsService: MembershipsService
  ) { }

  client: Client = {
    name: "",
    last_name: "",
    telephone: "",
    height: undefined,
    weight: undefined,
    goal: "",
    document: "",
    email: "",
    membershipsRecord: {
      date_start: "",
      date_finish: "",
      memberships: {
        name: "",
      }
    }
  };

  clientView: Client = null;

  membershipRecord: MembershipRecord = null;

  oneMembershipRecord: any = {
    id: undefined,
    membership: {
      id: undefined,
      name: undefined,
      time_lapse: undefined,
      price: undefined,
      description: undefined,
    }
  }

  membership: Membership = {
    id: undefined,
    name: undefined,
    time_lapse: undefined,
    price: undefined,
    description: undefined,

  }




  clientUpdate: Client = {};

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
      [Validators.required, Validators.minLength(3), Validators.maxLength(300)],
    ],
    start_date: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    document: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    email: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  });

  public editForm: FormGroup = this.fb.group({
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
      [Validators.required, Validators.minLength(3), Validators.maxLength(300)],
    ],
    start_date: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    document: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    email: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  });



  ngOnInit(): void {
    this.getClients();
    this.getMemberships();
    
  }

  async getMemberships() {
    this.membershipsService.getData().subscribe((resp) => {
      this.selectMulti = of(resp).pipe();
    });
  }

  selectEvent(event) {
    this.selectMultiSelectedEvent = event;
    console.log(this.selectMultiSelectedEvent);
    console.log(this.selectMultiSelectedEvent.id);
    console.log(this.selectMultiSelectedEvent.time_lapse);
  }

  getClients() {
    this.clientsService.getData().subscribe((res) => {
      this.rows = res;
      this.tempData = res;
      this.client = res;
      console.log(JSON.stringify(this.rows));
    });
  }

  getMembershipRecordResp() {
    this.membershipsRecordsService.getMembershipRecord(this.client_id).subscribe(
      (res: any) => {

        this.selectMultiSelected = res;
        console.log(res);
        this.hasMembership = true;
      },
      (err) => console.log(err)
    )

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
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El gimnasio ha sido eliminado',
              showConfirmButton: false,
              timer: 1000
            })
            this.getClients();
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

  // modal Open Vertically Centered
  modalOpenVC(modalVC) {
    this.modalService.open(modalVC, {
      centered: true
    });

  }

  getClientInfo(id) {
    this.clientsService.getClient(id).subscribe(
      (res) => {
        console.log(res);
        this.clientView = res;
      }
    )
  }


  validField(field: string) {
    return this.clientForm.controls[field].errors &&
      this.clientForm.controls[field].touched;
  }

  editValidField(field: string) {
    return this.editForm.controls[field].errors &&
      this.editForm.controls[field].touched;
  }

  getMembershipRecordByClient(id: number) {
    this.membershipsRecordsService.getMembershipRecordByClientId(id).subscribe(
      (res) => {
        console.log(res);
        this.membershipRecord = res;



      }
    )
  }



  getClient(client: any) {
    this.rowId = client.id;
    this.editForm.controls['name'].setValue(client.name);
    this.editForm.controls['manager_name'].setValue(client.manager_name);
    this.editForm.controls['telephone'].setValue(client.telephone);
    this.editForm.controls['height'].setValue(client.height);
    this.editForm.controls['weight'].setValue(client.weight);
    this.editForm.controls['goal'].setValue(client.goal);
    this.editForm.controls['start_date'].setValue(client.membershipsRecord.date_start);
    this.editForm.controls['document'].setValue(client.document);
    this.editForm.controls['email'].setValue(client.email);
  }

  saveNewClient() {

    try {
      this.client.name = this.clientForm.controls['name'].value;
      this.client.last_name = this.clientForm.controls['last_name'].value;
      this.client.telephone = this.clientForm.controls['telephone'].value;
      this.client.height = this.clientForm.controls['height'].value;
      this.client.weight = this.clientForm.controls['weight'].value;
      this.client.goal = this.clientForm.controls['goal'].value;
      this.client.start_date = this.clientForm.controls['start_date'].value;
      this.client.membership_id = this.selectMultiSelectedEvent.id;
      this.client.document = this.clientForm.controls['document'].value;
      this.client.email = this.clientForm.controls['email'].value;

      this.clientsService.addClient(this.client).subscribe(
        (res) => {


          let data: any = res;

          console.log(res);
          this.addSede = true;
          this.getClients();


          if (data.status == 'error') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El cliente ya se encuentra registrado'
            })
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El gimnasio ha sido creado',
              showConfirmButton: false,
              timer: 1000
            })
            this.clientForm.reset();
          }
        }
      );


    } catch (error) {

      console.log(error);


    }

  }

  getOneClient(client: any) {

    /* Se toma la fecha y se le da el formato yyyy-mm-dd */
    this.rowId = client.id;
    let date = new Date(client.membershipsRecord.date_start);
    let d = date.getDate();
    let mFormat = date.getMonth() + 1;
    let m = mFormat < 10 ? '0' + mFormat : mFormat;
    let y = date.getFullYear();
    let date_start = (y + '-' + m + '-' + d).toString();

    this.editForm.controls['name'].setValue(client.name);
    this.editForm.controls['last_name'].setValue(client.last_name);
    this.editForm.controls['telephone'].setValue(client.telephone);
    this.editForm.controls['height'].setValue(client.height);
    this.editForm.controls['weight'].setValue(client.weight);
    this.editForm.controls['goal'].setValue(client.goal);
    this.editForm.controls['start_date'].setValue(date_start);
    this.editForm.controls['document'].setValue(client.document);
    this.editForm.controls['email'].setValue(client.email);
  }



  updateClient() {
    this.clientUpdate.name = this.editForm.controls['name'].value;
    this.clientUpdate.last_name = this.editForm.controls['last_name'].value;
    this.clientUpdate.telephone = this.editForm.controls['telephone'].value;
    this.clientUpdate.height = this.editForm.controls['height'].value;
    this.clientUpdate.weight = this.editForm.controls['weight'].value;
    this.clientUpdate.goal = this.editForm.controls['goal'].value;
    this.clientUpdate.document = this.editForm.controls['document'].value;
    this.clientUpdate.email = this.editForm.controls['email'].value;

    this.clientsService.updateClient(this.rowId, this.clientUpdate).subscribe(
      (res) => {
        let data: any = res;
        this.modalService.dismissAll('modalEdit');
        console.log('update',res);
        this.getClients();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El cliente ha sido actualizado',
          showConfirmButton: false,
          timer: 1000
        })
      },
      (err) => {
        console.log(err)
      }
    );

        
  }

  getMembershipRecords() {
    this.membershipsRecordsService.getData().subscribe((data) => {
      console.log(data);

    });
  }

  eye(rowId) {
    console.log('rowId: ', rowId);

  }

}
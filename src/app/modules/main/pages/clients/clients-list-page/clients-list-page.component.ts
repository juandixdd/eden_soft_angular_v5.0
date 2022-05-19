import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, id } from '@swimlane/ngx-datatable';
import moment from 'moment';
import Swal from 'sweetalert2';
import { Client } from '../../../../../core/models/client';
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
  clientUser: any;
  clientDateStart: string;
  membershipTimeLapse: number;
  clientInfo: any;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public searchValue = '';
  public selectedStatus = [];
  private tempData: any = [];
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

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
    private router: Router,
    private modalService: NgbModal,
    private fb: FormBuilder,
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
    status: undefined,
    membershipsRecord: {
      date_start: "",
      date_finish: "",
      memberships: {
        name: "",
      }
    }
  };

  clientView: Client = null;
  membershipView = null;

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
      [Validators.required, Validators.pattern(this.emailPattern)],
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
      [Validators.required, Validators.pattern(this.emailPattern)],
    ],
  });



  ngOnInit(): void {

  }

 

  selectEvent(event) {
    this.selectMultiSelectedEvent = event;
  }




  clientStatus: number;

  validateClientStatus(){
   /* Recorre clients e imprime su status */ 
    this.rows.forEach(element => {

      let actualDate = new Date();
      let clientFinishDate = new Date(element.membershipsRecord.date_finish);

      /* Cuantos dias faltan para llegar a finishdate */
      let days = Math.floor((clientFinishDate.getTime() - actualDate.getTime()) / (1000 * 60 * 60 * 24));

      console.log('ClientId: ' + element.id + ' Days: ' + days);

      if(days <= 0){
        element.status = 1;
      }else if(days > 5){
        element.status = 0;
      }else if(days > 0 && days <= 5){
        element.status = 2;
      }
    });
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

 

    /* this.membershipsRecordsService.getMembershipRecordByClientId(this.clientView.id).subscribe(
      (res) => {
        console.log(res);
        this.membershipRecord = res;
      }
    ) */
  }


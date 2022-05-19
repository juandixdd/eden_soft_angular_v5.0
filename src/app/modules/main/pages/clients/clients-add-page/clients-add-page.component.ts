import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { Membership } from '../../../../../core/models/membership';
import { MembershipRecord } from '../../../../../core/models/membership-record';
import { Client } from '../../../../../core/models/client';


import { map } from 'rxjs/operators';
import { of } from "rxjs";
import moment from "moment";
import Swal from "sweetalert2";

@Component({
  selector: 'app-clients-add-page',
  templateUrl: './clients-add-page.component.html',
  styleUrls: ['./clients-add-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientsAddPageComponent implements OnInit {
  edit: boolean = false;
  addSede: boolean = false;
  selectMulti: any;
  selectMultiSelected: any;

  selectMultiSelectedEvent: any;

  dateStartSelected: any;
  hasMembership: boolean = false;
  basicDPdata: any;

  rows: any = [];
  data: any = [];
  cols: any = [];
  public selectedOption = 10;
  public searchValue = "";
  public selectedStatus = [];
  private tempData: any = [];
  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  client_id: any;

  client: Client = {
    id: undefined,
    name: "",
    last_name: "",
    telephone: undefined,
  };

  membershipRecord: MembershipRecord = {
    id: undefined,
    membership_id: undefined,
    client_id: undefined,
  }

  membership: Membership = {
    id: undefined,
    name: "",
    description: "",
    price: undefined,
    time_lapse: undefined,
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.client_id = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
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
  });

  get f() {
    return this.clientForm.controls;
  }

  confirmSaveAlert() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Se actualizó el cliente",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  

  
}
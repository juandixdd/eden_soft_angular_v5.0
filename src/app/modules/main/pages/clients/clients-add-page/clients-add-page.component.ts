import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ColumnMode, DatatableComponent } from "@swimlane/ngx-datatable";
import { MembershipsService } from "app/modules/main/services/memberships/memberships.service";
import { MembershipsRecordsService } from "app/modules/main/services/memberships-records/memberships-records.service";
import { ClientsService } from "app/modules/main/services/clients/clients.service";
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
    private clientsService: ClientsService,
    private membershipsService: MembershipsService,
    private membershipsRecordsService: MembershipsRecordsService,
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.client_id = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {

    this.selectMultiSelected = this.membershipsRecordsService.getMembershipRecord(this.client_id).pipe(map(resp => {
      if (resp) {
        this.hasMembership = true;
        return resp['membership'];
      }
      return null;
    }));

    if (this.client_id) {
      this.clientsService.getClient(this.client_id).subscribe(
        (res) => {
          console.log(res);
          this.client = res;
          this.edit = true;
        },
        (err) => console.log(err)
      );
    }
    this.getMemberships();
  }

  getMembershipRecordResp() {
    this.membershipsRecordsService.getMembershipRecord(this.client_id).subscribe(
      (res: any) => {
        console.log("sfdfsdfsdfsdfsd");

        this.selectMultiSelected = res;
        console.log(res);
        this.hasMembership = true;
      },
      (err) => console.log(err)
    )

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



  saveclient() {
    this.clientsService.addClient(this.client).subscribe(
      (res) => {
        let data: any = res;
        this.confirmSaveAlert();
        this.router.navigate([`/clients/edit/${data.id}`]);
        console.log(res);
        this.addSede = true;
      },
      (err) => console.log(err)
    );
  }

  async getMemberships() {
    this.membershipsService.getData().subscribe((resp) => {
      this.selectMulti = of(resp).pipe();
    });
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

  confirmUpdateAlert() {
    Swal.fire({
      title: "¿Seguro?",
      text: "Esta acción actualizará el cliente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateClient();
        this.ngOnInit();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "El cliente ha sido actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  selectEvent(event) {
    this.selectMultiSelectedEvent = event;

  }

  updateClient() {
    this.clientsService.updateClient(this.client.id, this.client).subscribe(
      (res) => {
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




          this.membershipsRecordsService
            .addMembershipRecord(record)
            .subscribe((resp) => {
              this.router.navigate(["/clients"]);
            });
        } else {
          this.router.navigate(["/clients"]);
        }
      },
      (err) => console.log(err)
    );
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { Membership } from 'app/core/models/membership';
import { MembershipsService } from 'app/modules/main/services/memberships/memberships.service';
import { User } from '../../../../../core/models/user';


@Component({
  selector: 'app-memberships-add-page',
  templateUrl: './memberships-add-page.component.html',
  styleUrls: ['./memberships-add-page.component.scss']
})
export class MembershipsAddPageComponent implements OnInit {

  edit: boolean = false;
  addUser: boolean = false;

  rows: any = [];
  data: any = [];
  cols: any = [];
  public selectedOption = 10;
  public searchValue = '';
  public selectedStatus = [];
  private tempData: any = [];
  public ColumnMode = ColumnMode;

  membership: Membership = {
    id: undefined,
    name: "",
    price: undefined,
    description: "",
    time_lapse: "",
  }

  user: User = {
    id: undefined,
    email: "",
    password: "",
    name: "",
    lastName: "",
    role: "",
  }

  

  membership_id: any;

  constructor(
    private membershipsService: MembershipsService,
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {
    this.membership_id = this.activateRoute.snapshot.params.id;
   }

   public membershipForm: FormGroup = this.fb.group({
    name: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    price: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    description: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    time_lapse: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],

  });

  get f() {
    return this.membershipForm.controls;
  }

  ngOnInit(): void {
    if (this.membership_id) {
      this.membershipsService.getMembership(this.membership_id).subscribe(
        (res) => {
          console.log(res);
          this.membership = res;
          this.edit = true;
        },
        (err) => console.log(err)
      );
    }
  }

  saveMembership() {
    this.membershipsService.addMembership(this.membership).subscribe(
      (res) => {
        let data:any = res;
        this.confirmSaveAlert();
        this.router.navigate([`/memberships/edit/${data.id}`]);
        console.log(res);
        this.addUser = true;
      },
      (err) => console.log(err)
    );
  }

  confirmSaveAlert(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se agregó el gimnasio',
      showConfirmButton: false,
      timer: 1500
    })
  }

  confirmUpdateAlert(){
    Swal.fire({
      title: '¿Seguro?',
      text: "Esta acción actualizará la sede",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.updatemembership();
        this.sucessAlert();
      }
    })
  }

  updatemembership(){
    this.membershipsService.updateMembership(this.membership.id, this.membership).subscribe(
      (res) => {
        this.router.navigate(["/memberships"]);
      },
      (err) => console.log(err)
    );
  }

  sucessAlert(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'La membresía ha sido actualizada',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
  
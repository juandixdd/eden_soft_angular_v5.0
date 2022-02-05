import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { MembershipsService } from "app/modules/main/services/memberships/memberships.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Membership } from "app/core/models/membership";
import { ColumnMode } from "@swimlane/ngx-datatable";


@Component({
  selector: 'app-memberships-list-page',
  templateUrl: './memberships-list-page.component.html',
  styleUrls: ['./memberships-list-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembershipsListPageComponent implements OnInit {

  rows: any = [];
  data: any = [];
  cols: any = [];
  rowId: number;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public searchValue = '';
  public selectedStatus = [];
  private tempData: any = [];

  constructor(
    public membershipsService: MembershipsService,
    private router: Router,
    private modalService: NgbModal,
     private fb: FormBuilder
  ) {}

  membership: Membership = {
    name: "",
    price: undefined,
    description: "",
    time_lapse: "",
  }

  membershipUpdate: Membership = {};

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

  public editForm: FormGroup = this.fb.group({
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

  ngOnInit(): void {
    this.getMemberships();

    this.membershipsService.getData().subscribe((data) => {
      res => {
        this.membership = res;
      }
      err => {
        console.error(err);
      }
    })
  }

  getMemberships() {
    this.membershipsService.getData().subscribe((res) => {
      this.rows = res;
      this.tempData = res;
    });
  }


  confirmDeleteMembership(id: number) {
    Swal.fire({
      title: "¿Seguro?",
      text: "Esta acción eliminará el membresía",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Eliminar!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.membershipsService.deleteMembership(id).subscribe((data) => {
          const resp: any = data;
          if (resp.status) {
            this.ngOnInit();
            Swal.fire("Eliminada!", "La membresía ha sido eliminada", "success");
          } else {
            console.log("Error");
          }
        });
      }
    });
  }


  // modal Open Form
  modalOpenForm(modalForm) {
    this.modalService.open(modalForm);
  }
  
  modalOpenEdit(modalEdit){
    this.modalService.open(modalEdit);
  }
  

  validField(field: string) {
    return this.membershipForm.controls[field].errors &&
      this.membershipForm.controls[field].touched;
  }

  editValidField(field: string){
    return this.editForm.controls[field].errors &&
            this.editForm.controls[field].touched;
  }

  

  getOneMembership() {
    this.membershipsService.getMembership(this.rowId).subscribe((data) => {
      this.membership = data;
    });
  }

  getMembership(membership: any) {

    this.rowId = membership.id;
    this.editForm.controls['name'].setValue(membership.name);
    this.editForm.controls['price'].setValue(membership.price);
    this.editForm.controls['time_lapse'].setValue(membership.time_lapse);
    this.editForm.controls['description'].setValue(membership.description);
  }	

  saveNewMembership() {

    this.membership.name = this.membershipForm.controls['name'].value;
    this.membership.price = this.membershipForm.controls['price'].value;
    this.membership.description = this.membershipForm.controls['description'].value;
    this.membership.time_lapse = this.membershipForm.controls['time_lapse'].value;

    this.membershipsService.addMembership(this.membership).subscribe(
      (res) => {
        let data: any = res;
        this.getMemberships();
        if(data.status == 'error'){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El cliente ya se encuentra registrado'
          })
        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La membresía ha sido creada',
            showConfirmButton: false,
            timer: 1000
          })
          this.membershipForm.reset();
        }
      },
      (err) => console.log(err)
    );
  }
 


  updateMembership() {
    

    this.membershipUpdate.name = this.editForm.controls['name'].value;
    this.membershipUpdate.price = this.editForm.controls['price'].value;
    this.membershipUpdate.description = this.editForm.controls['description'].value;
    this.membershipUpdate.time_lapse = this.editForm.controls['time_lapse'].value;

    this.membershipsService.updateMembership(this.rowId, this.membershipUpdate).subscribe(
      (res) => {
        // if(status==1){mostrar mensaje de exito}else{mostrar mensaje de error}
        let data: any = res;
        this.modalService.dismissAll('modalEdit');
        this.getMemberships();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La membresía ha sido actualizada',
          showConfirmButton: false,
          timer: 1000
        })
      },
      (err) =>{
        console.log(err)
      // {mostrar mensaje de error}
      } 
    );
    
  }
}
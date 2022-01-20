import { Component, OnInit } from "@angular/core";
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
  styleUrls: ['./memberships-list-page.component.scss']
})
export class MembershipsListPageComponent implements OnInit {

  rows: any = [];
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  data: any = [];
  cols: any = [];
  public searchValue = '';
  public selectedStatus = [];
  private tempData: any = [];

  membership: Membership = {
    name: "",
    price: undefined,
    description: "",
    time_lapse: "",
  }

  constructor(
    public membershipsService: MembershipsService,
    private router: Router,
    private modalService: NgbModal,
     private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMemberships();
  }

  getMemberships() {
    this.membershipsService.getData().subscribe((res) => {
      this.rows = res;
      this.tempData = res;
    });
  }

  createMembership() {
    Swal.fire({
      title: "Crear Gimnasio",
      html: `<input type="text" id="name" class="swal2-input" placeholder="Nombre">
             <input type="text" id="price" class="swal2-input" placeholder="Precio de la membresía">
             <input type="text" id="description" class="swal2-input" placeholder="Descripción">
              <input type="text" id="time_lapse" class="swal2-input" placeholder="Duración">,
             `,
      confirmButtonText: "Crear",
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name")["value"];
        const price = Swal.getPopup().querySelector("#price")["value"];
        const description =
          Swal.getPopup().querySelector("#description")["value"];
        const time_lapse =
          Swal.getPopup().querySelector("#time_lapse")["value"];
        if (!name || !price || !description || !time_lapse) {
          Swal.showValidationMessage(`Por favor validar todos los campos`);
          return false;
        } else {
          return {
            name: name,
            price: price,
            description: description,
            time_lapse: time_lapse,
          };
        }
      },
    }).then((result) => {
      if (result.value) {
        this.membershipsService.addMembership(result.value).subscribe((resp) => {
          console.log(resp);
          let data: any = resp;
          this.ngOnInit();
        });
      }
    });
  }

  confirmDeleteMembership(id: number) {
    Swal.fire({
      title: "¿Seguro?",
      text: "Esta acción eliminará el gimnasio",
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
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            console.log(`Gimnasio eliminado`);
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

  validField(field: string) {
    return this.membershipForm.controls[field].errors &&
      this.membershipForm.controls[field].touched;
  }

  saveNewMembership() {
    this.membershipsService.addMembership(this.membership).subscribe(
      (res) => {
        let data: any = res;
        console.log(res);
        this.ngOnInit();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La membresía ha sido creada',
          showConfirmButton: false,
          timer: 1000
        })
      },
      (err) => console.log(err)
    );
  }

  

  updateMembership(id) {
    this.membershipsService.updateMembership(this.membership.id, this.membership).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }
}
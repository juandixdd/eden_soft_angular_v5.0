import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { MembershipsService } from "app/modules/main/services/memberships/memberships.service";


@Component({
  selector: 'app-memberships-list-page',
  templateUrl: './memberships-list-page.component.html',
  styleUrls: ['./memberships-list-page.component.scss']
})
export class MembershipsListPageComponent implements OnInit {
  constructor(
    public customeService: MembershipsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
        this.customeService.addMembership(result.value).subscribe((resp) => {
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
        this.customeService.deleteMembership(id).subscribe((data) => {
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

  updateMembership(id: number) {
    this.router.navigate([`/memberships/edit/${id}`]);
  }
}
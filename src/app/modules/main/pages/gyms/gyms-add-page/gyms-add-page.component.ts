import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { GymsService } from 'app/modules/main/services/gyms/gyms.service';
import Swal from "sweetalert2";
import { gym } from '../../../../../core/models/gym';
import { place } from '../../../../../core/models/place';
import { PlacesService } from '../../../services/places/places.service';


@Component({
  selector: 'app-gyms-add-page',
  templateUrl: './gyms-add-page.component.html',
  styleUrls: ['./gyms-add-page.component.scss']
})
export class GymsAddPageComponent implements OnInit {
  edit: boolean = false;
  addplace: boolean = false;

  rows: any = [];
  data: any = [];
  cols: any = [];
  public selectedOption = 10;
  public searchValue = "";
  public selectedStatus = [];
  private tempData: any = [];
  public ColumnMode = ColumnMode;

  gym: gym = {
    id: undefined,
    name: "",
    manager_name: "",
    telephone: undefined,
  };

  place: place = {
    name: "",
    adress: "",
    manager_name: "",
    telephone: undefined,
    gyms: {
      id: undefined,
    },
  };

  gym_id: any;

  constructor(
    private gymsService: GymsService,
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    public placeService: PlacesService
  ) {
    this.gym_id = this.activateRoute.snapshot.params.id;
  }

  public gymForm: FormGroup = this.fb.group({
    name: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    manager_name: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    telephone: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  });

  get f() {
    return this.gymForm.controls;
  }

  ngOnInit(): void {
    if (this.gym_id) {
      this.gymsService.getGym(this.gym_id).subscribe(
        (res) => {
          console.log(res);
          this.gym = res;
          this.edit = true;
        },
        (err) => console.log(err)
      );
    }
  }

  saveGym() {
    this.gymsService.addGym(this.gym).subscribe(
      (res) => {
        let data: any = res;
        this.confirmSaveAlert();
        this.router.navigate([`/gyms/edit/${data.id}`]);
        console.log(res);
        this.addplace = true;
      },
      (err) => console.log(err)
    );
  }

  updateGym() {
    this.gymsService.updateGym(this.gym.id, this.gym).subscribe(
      (res) => {
        this.router.navigate(["/gyms"]);
      },
      (err) => console.log(err)
    );
  }

  confirmSaveAlert() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Se agregó el gimnasio",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  createplace() {
    Swal.fire({
      title: "Crear place",
      html: ` <input type="text" id="name" class="swal2-input" placeholder="Nombre">
              <input type="text" id="adress" class="swal2-input" placeholder="Dirección">
              <input type="text" id="manager_name" class="swal2-input" placeholder="Nombre del encargado">
              <input type="text" id="telephone" class="swal2-input" placeholder="Telefono">`,
      confirmButtonText: "Crear",
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name")["value"];
        const manager_name =
          Swal.getPopup().querySelector("#manager_name")["value"];
        const adress = Swal.getPopup().querySelector("#adress")["value"];
        const telephone = Swal.getPopup().querySelector("#telephone")["value"];
        const gyms_id = this.gym_id;
        if (!name || !manager_name || !adress || !telephone || !gyms_id) {
          Swal.showValidationMessage(`Por favor validar todos los campos`);
        } else {
          return {
            name: name,
            adress: adress,
            manager_name: manager_name,
            telephone: telephone,
            gyms: {
              id: gyms_id,
            },
          };
        }
      },
    }).then((result) => {
      if (result.value) {
        this.placeService.addPlace(result.value).subscribe((resp) => {
          let data: any = resp;
          this.ngOnInit();
        });
      }
    });
  }

  confirmUpdateAlert() {
    Swal.fire({
      title: "¿Seguro?",
      text: "Esta acción actualizará el gimnasio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Actualizar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateGym();
        this.ngOnInit();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "El gimnasio ha sido actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  updateplace(id) {
    console.log(id);
    this.placeService.getPlace(id).subscribe((place) => {
      console.log(place);
      this.place = place;
      /* this.place.adress = "Hola mundo"; */
      Swal.fire({
        title: "Editar place",
        html: ` <input type="text" id="name" class="swal2-input" placeholder="Nombre" value="${this.place.name}">
                <input type="text" id="adress" class="swal2-input" placeholder="Dirección" value="${this.place.adress}">
                <input type="text" id="manager_name" class="swal2-input" placeholder="Nombre del encargado" value="${this.place.manager_name}">
                <input type="text" id="telephone" class="swal2-input" placeholder="Telefono" value="${this.place.telephone}">`,
        confirmButtonText: "Editar",
        focusConfirm: false,
        preConfirm: () => {
          const name = Swal.getPopup().querySelector("#name")["value"];
          const manager_name =
            Swal.getPopup().querySelector("#manager_name")["value"];
          const adress = Swal.getPopup().querySelector("#adress")["value"];
          const telephone =
            Swal.getPopup().querySelector("#telephone")["value"];
          if (!name || !manager_name || !adress || !telephone) {
            Swal.showValidationMessage(`Por favor validar todos los campos`);
          } else {
            return {
              name: name,
              adress: adress,
              manager_name: manager_name,
              telephone: telephone,
              id: id,
            };
          }
        },
      }).then((result) => {
        console.log(result.value);
        this.ngOnInit();
        this.placeService.updatePlace(id, result.value).subscribe((resp) => {
          console.log(resp);
          let data: any = resp;
          this.ngOnInit();
        });
      });
    });
  }

  confirmDeleteplace(id: number) {
    Swal.fire({
      title: "¿Seguro?",
      text: "Esta acción eliminará la place",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.placeService.deletePlace(id).subscribe((resp) => {
          console.log(resp);
          this.ngOnInit();
          let data: any = resp;
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "La place ha sido eliminada",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }
}

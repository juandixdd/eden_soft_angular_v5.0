import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UsersService } from "app/modules/services/users/users.service";
import { UsuarioService } from "app/modules/services/usuario/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-perfil-usuario",
  templateUrl: "./perfil-usuario.component.html",
  styleUrls: ["./perfil-usuario.component.scss"],
})
export class PerfilUsuarioComponent implements OnInit {
  rows: any = [];
  userData: any = {};
  archivos: any = [];
  prevImg: string;
  imgUrl: string = "../../../../../assets/images/avatars/usuario.png"

  constructor(
    private modalService: NgbModal,
    private usuarioService: UsuarioService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  public editForm: UntypedFormGroup = this.fb.group({
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    apellido: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    correo: [
      "",
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.email,
      ],
    ],
    id_cliente_documento: [
      "",
      [Validators.required, Validators.minLength(6), Validators.maxLength(10)],
    ],
    telefono: [
      "",
      [Validators.required, Validators.minLength(7), Validators.maxLength(15)],
    ],
    img: [
      "",
      [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]
    ]
  });

  ngOnInit(): void {
    this.getUserData(localStorage.getItem("userId"));
  }
  modalOpen(modal) {
    //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }

  getRowData(userData) {
    console.log(userData, "Este es el evento");
    this.editForm.controls["nombre"].setValue(userData.nombre);
    this.editForm.controls["apellido"].setValue(userData.apellido);
    this.editForm.controls["telefono"].setValue(userData.telefono);
    this.editForm.controls["correo"].setValue(userData.correo);
    this.editForm.controls["img"].setValue(userData.img);
    this.editForm.controls["id_cliente_documento"].setValue(
      userData.id_cliente_documento
    );
  }
  getUserData(id) {
    this.usuarioService.getDataById(id).subscribe((res: any) => {
      this.userData = res[0];
      this.imgUrl = res[0].img || "../../../../../assets/images/avatars/usuario.png"
      this.imgPreview = res[0].img || null
      console.log(res);
    });
  }

  validFieldEdit(field: string) {
    return (
      this.editForm.controls[field].errors &&
      this.editForm.controls[field].touched
    );
  }

  clearUrlData() {
    this.editForm.controls["img"].setValue("");
    this.imgPreview=""
  }

  imgPreview: any;

  declareImg(event) {
    setTimeout(() => {
      this.imgPreview = event.target.value
      console.log(event.target.value);
    }, 200);


  }

  editProfile() {
    let body = {
      nombre: this.editForm.value.nombre,
      apellido: this.editForm.value.apellido,
      telefono: this.editForm.value.telefono,
      img: this.editForm.value.img
    };

    this.usuarioService
      .editProfile(this.userData.id_cliente_documento, body)
      .subscribe((res: any) => {
        if (res.status === 200) {
          this.usuarioService.editImage(this.userData.id_cliente_documento, body).subscribe(
            (res: any) => {
              if (res.status === 200) {
                console.log(body.img);

                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Actualización de Perfil Exitosa",
                  showConfirmButton: false,
                  timer: 1500,
                });
                this.modalService.dismissAll;
                this.reoladPage();
              }

            }
          )

        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Vuelve a intentarlo, pasó algo imprevisto",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  reoladPage() {
    setTimeout(() => {
      this.router
        .navigate(["/main/perfil-usuario"])
        .then(() => window.location.reload());
    }, 2000);
  }
}

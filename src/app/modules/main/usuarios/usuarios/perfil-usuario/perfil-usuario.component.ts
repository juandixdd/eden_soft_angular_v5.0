import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'app/modules/services/users/users.service';
import { UsuarioService } from 'app/modules/services/usuario/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  rows: any = [];
  userData: any = {};

  constructor(
    private modalService: NgbModal,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
  ) { }

  public editForm: FormGroup = this.fb.group({
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
      [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.email],
    ],
    id_cliente_documento: [
      "",
      [Validators.required, Validators.minLength(6), Validators.maxLength(10)],
    ],
    telefono: [
      "",
      [Validators.required, Validators.minLength(7), Validators.maxLength(15)],
    ],
  });

  


  ngOnInit(): void {
    this.getUserData(localStorage.getItem("userId"))
  }
  modalOpen(modal) {
    //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }

  getRowData(userData) {
    console.log(userData, "Este es el evento")
    this.editForm.controls['nombre'].setValue(userData.nombre)
    this.editForm.controls['apellido'].setValue(userData.apellido)
    this.editForm.controls['telefono'].setValue(userData.telefono) 
    this.editForm.controls['correo'].setValue(userData.correo)
    this.editForm.controls['id_cliente_documento'].setValue(userData.id_cliente_documento)
  }
  getUserData(id) {
    this.usuarioService.getDataById(id).subscribe((res: any) => {
      this.userData = res[0];
      console.log(res);

    })
  }

  
  validFieldEdit(field: string) {
    return (
      this.editForm.controls[field].errors &&
      this.editForm.controls[field].touched
    );
  }

}

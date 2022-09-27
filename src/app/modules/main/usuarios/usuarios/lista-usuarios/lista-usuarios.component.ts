import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { RolesService } from 'app/modules/services/roles/roles.service';
import { UsersService } from 'app/modules/services/users/users.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
  encapsulation: ViewEncapsulation.None //! Esto es importante para que se muestren bien los estilos, siempre agregar a los componentes.

})
export class ListaUsuariosComponent implements OnInit {
  public kitchenSinkRows: any;
  public selectedOption = 10; //? Este es el selector de cuantas filas quieres ver en la tabla, en este caso, 10.
  selectBasic: any;

  constructor(
    private modalService: NgbModal, //? Aquí se instancia el servicio para abrir la modal.
    private usersService: UsersService,
    private fb: FormBuilder,
    private rolesService:RolesService
  ) { }

  private tempData = []; //? Estas son cosas del buiscador (Que no funciona)
  public ColumnMode = ColumnMode; //? Esto es para que cuando selecciones una fila, se seleccione la fila y no el boton.
  rows: any = [];
  _filterRows: any = [];
  cols: any = [];
  user: any = {};
  editUser: any = {};
  userUpdate: any = null;
  idRol:any;
  rolData:any;

  //? Get y Set para el buscador
  get filterRows(): any {
    return this._filterRows;
  }

  set filterRows(value) {
    this._filterRows = value;
  }

  public userForm: FormGroup = this.fb.group({
    id: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    last_name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    email: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.email]
    ],
    rol: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    phone: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    confirmPassword: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ]

  })

  public editUserForm: FormGroup = this.fb.group({
    id: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    last_name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    email: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.email]
    ],
    
    phone: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    rol:[
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ]
  })




  ngOnInit(): void {
    this.getUsers();  //!Cuando vayamos a conectar con base de datos se descomenta esta línea y se borra el resto
    this.getRoles();
  }
  onChange(event){
    console.log(event.id);
    this.idRol=event.id;
    
  }

  validField(field: string) {
    return this.userForm.controls[field].errors &&
      this.userForm.controls[field].touched;
  }

  editValidField(field: string) {
    return this.editUserForm.controls[field].errors &&
      this.editUserForm.controls[field].touched;
  }

  getUsers() {
    this.usersService.getData().subscribe(
      (res) => {
        this.rows = res;
        console.log(this.rows)
      }
    )
  }
  createUser() {
    this.user.id = this.userForm.controls['id'].value;
    this.user.name = this.userForm.controls['name'].value;
    this.user.last_name = this.userForm.controls['last_name'].value;
    this.user.email = this.userForm.controls['email'].value;
    this.user.password = this.userForm.controls['password'].value;
    this.user.phone = this.userForm.controls['phone'].value;
    this.user.rol=this.idRol;

    this.usersService.createUser(this.user).subscribe(
      (res: any) => {
        if (res.statusCode == 403) {
          this.modalService.dismissAll();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya se encuentra registrado un usuario con este número de cédula'
          })
        } else {
          this.modalService.dismissAll();
          this.getUsers();
          this.userForm.reset();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario creado con exito',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    );
  }


  getUserData(user) {
    this.userUpdate = user;
    this.editUserForm.controls['id'].setValue(user.id);
    this.editUserForm.controls['name'].setValue(user.name);
    this.editUserForm.controls['last_name'].setValue(user.last_name);
    this.editUserForm.controls['email'].setValue(user.email);
    this.editUserForm.controls['phone'].setValue(user.phone);
    this.rolData=user.nombre_rol
    
  }


  updateUser() {

    this.editUser.id = this.editUserForm.controls['id'].value;
    this.editUser.name = this.editUserForm.controls['name'].value;
    this.editUser.last_name = this.editUserForm.controls['last_name'].value;
    this.editUser.email = this.editUserForm.controls['email'].value;
    this.editUser.phone = this.editUserForm.controls['phone'].value;
    this.editUser.rol=this.rolData;

    console.log(this.editUser.value)
  }

  deleteUser(id) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminarlo!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.usersService.deleteUser(id).subscribe(
          (res) => {
            let data: any = res;
            this.user = res;
            this.getUsers();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Usuario eliminado con exito',
              showConfirmButton: false,
              timer: 1000
            });
          }
        );
      }
    })
  }


  modalOpen(modal) { //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.rows.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.filterRows = temp;
  }

  confirmAlert() { //? Esta es la funcion que abre el sweetAlert de confirmacion.
    Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Eliminado!',
          'El Usuario ha sido Eliminado.',
          'success'
        )
      }
    })
  }

  validPassword() {
    return this.userForm.controls['password'].value !== this.userForm.controls['confirmPassword'].value &&
      this.userForm.controls['password'].value !== '';
  }

  editValidPassword() {
    return this.editUserForm.controls['password'].value !== this.editUserForm.controls['confirmPassword'].value &&
      this.editUserForm.controls['password'].value !== '';
  }

  resetForm() {
    this.userForm.reset()
    this.editUserForm.reset()
  }

 async getRoles() {
  this.rolesService.getData().subscribe((res:any)=>{
    this.selectBasic=of(res).pipe();
    console.log(this.selectBasic);
  });
 }

}

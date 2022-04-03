import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { UsersService } from 'app/modules/main/services/users/users.service';
import Swal from 'sweetalert2';
import { User } from '../../../../../core/models/user';

@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersListPageComponent implements OnInit {

  rows: any = [];
  data: any = [];
  cols: any = [];
  rowId: number;
  userView: any;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public searchValue = '';
  public selectedStatus = [];
  private tempData: any = [];
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(
    public customeService: UsersService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private userService: UsersService
  ) { }

  user: any = {};
  userUpdate: any = null;

  public userForm: FormGroup = this.fb.group({
    name: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    lastname: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    telephone: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    email: [
      "",
      [Validators.required, Validators.pattern(this.emailPattern)],
    ],
    password: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    confirmPassword: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    role: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  });

  public editForm: FormGroup = this.fb.group({
    name: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    lastname: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    telephone: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    email: [
      "",
      [Validators.required, Validators.pattern(this.emailPattern)],
    ],
    password: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    confirmPassword: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    role: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  })

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getData().subscribe((res) => {
      this.rows = res;
      this.tempData = res;
      this.cols = Object.keys(res[0]);
    });
  }

  validField(field: string) {
    return this.userForm.controls[field].errors &&
      this.userForm.controls[field].touched;
  }

  editValidField(field: string) {
    return this.editForm.controls[field].errors &&
      this.editForm.controls[field].touched;
  }

  modalOpenForm(modalForm) {
    this.modalService.open(modalForm);
  }

  modalOpenEdit(modalEdit) {
    this.modalService.open(modalEdit);
  }

  modalOpenVC(modalVC) {
    this.modalService.open(modalVC, {
      centered: true
    });

  }

  getOneUser(user: any) {
    this.rowId = user.id;
    this.userUpdate = user;
    this.editForm.controls['name'].setValue(user.name);
    this.editForm.controls['lastname'].setValue(user.lastname);
    this.editForm.controls['telephone'].setValue(user.telephone);
    this.editForm.controls['email'].setValue(user.email);
    this.editForm.controls['role'].setValue(user.role);
  }

  saveNewUser() {
    this.user.name = this.userForm.controls['name'].value;
    this.user.lastname = this.userForm.controls['lastname'].value;
    this.user.telephone = this.userForm.controls['telephone'].value;
    this.user.email = this.userForm.controls['email'].value;
    this.user.password = this.userForm.controls['password'].value;
    this.user.role = this.userForm.controls['role'].value;


    this.userService.addUser(this.user).subscribe(
      (res) => {
        let data: any = res;
        this.user = res;
        this.getUsers();
        if (data.status != 'error') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario creado con exito',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if (data.status == 'error') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya se encuentra registrado un usuario con ese correo'
          })
        }
        this.userForm.reset();
      },
      (err) => console.log(err)

    );


  }

  updateUser() {
    this.userUpdate.name = this.editForm.controls['name'].value;
    this.userUpdate.lastname = this.editForm.controls['lastname'].value;
    this.userUpdate.telephone = this.editForm.controls['telephone'].value;
    this.userUpdate.email = this.editForm.controls['email'].value;
    this.userUpdate.role = this.editForm.controls['role'].value;

    this.userService.updateUser(this.rowId, this.userUpdate).subscribe(
      (res) => {
        let data: any = res;
        this.modalService.dismissAll('modalEdit');
        this.user = res;
        this.getUsers();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario actualizado con exito',
          showConfirmButton: false,
          timer: 1500
        })
        this.editForm.reset();
      },
      (err) => console.log(err)
    )
  }

  confirmDeleteUser(id: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(id).subscribe(
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

  validPassword() {
    return this.userForm.controls['password'].value !== this.userForm.controls['confirmPassword'].value &&
      this.userForm.controls['password'].value !== '';
  }

  getUserInfo(id){
    this.userService.getUser(id).subscribe(
      (res) => {
        this.userView = res;
      }
    )
  }







}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss'],
  encapsulation: ViewEncapsulation.None //! Esto es importante para que se muestren bien los estilos, siempre agregar a los componentes.

})
export class ListaUsuariosComponent implements OnInit {
  public kitchenSinkRows: any;
  public selectedOption = 10; //? Este es el selector de cuantas filas quieres ver en la tabla, en este caso, 10.
  constructor(
    private modalService: NgbModal, //? Aquí se instancia el servicio para abrir la modal.
    private usersService: UsersService,
    private fb: FormBuilder
    ) { }

    public userform:FormGroup=this.fb.group({
      id: [
        '',
        [Validators.required]
      ],
      name:[
        '',
        [Validators.required]
      ],
      lastname:[
        '',
        [Validators.required]
      ],
      email:[
        '',
        [Validators.required]
      ],
      address:[
        '',
        [Validators.required]
      ],
      phone:[
        '',
        [Validators.required]
      ],
      password:[
        '',
        [Validators.required]
      ]
      
    })

  private tempData = []; //? Estas son cosas del buiscador (Que no funciona)
  public ColumnMode = ColumnMode; //? Esto es para que cuando selecciones una fila, se seleccione la fila y no el boton.
  rows: any = [];
  cols: any = [];
  user: any = {};


  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.usersService.getData().subscribe(
      (res) => {
        this.rows = res;
        console.log("rows: ", this.rows);

      }
    )
  }
  createUser() {
    this.user.id = this.userform['id'].value;
    this.user.name = this.userform['name'].value;
    this.user.lastname = this.userform['lastname'].value;
    this.user.email = this.userform['email'].value;
    this.user.address = this.userform['address'].value;
    this.user.phone = this.userform['phone'].value;
    this.user.password = this.userform['password'].value;
/*
    this.usersService.createUser(this.user).subscribe(
      (res) => {
        this.user=res;
        this.getUsers();
      }
    );*/
   
  }


  modalOpen(modal) { //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }
  filterUpdate(event) { //? Buscador, no le pare bolas.
    const val = event.target.value.toLowerCase();

    const temp = this.tempData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
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
  //funcion que le da value a los imputs del modal
  setValue(id, nombre, apellidos, email, direccion, phone) {

    id = 1;
    nombre = 'jesus';
    apellidos = 'perez';
    email = 'juan@gmail.com';
    direccion = 'Calle 39B sur';
    phone = 3006483858;
  }

}

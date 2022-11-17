import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ClientesInformativosService } from 'app/modules/services/clientesInformativos/clientes-informativos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClienteComponent implements OnInit {

  public kitchenSinkRows: any;
  public selectedOption = 10;
  private tempData = [];
  public ColumnMode = ColumnMode;

  rows: any = []
  cliente: any = {};
  idEdit: any;
  _filterRows: any = [];

  constructor(
    private modalService: NgbModal,
    private clientesInformativosService: ClientesInformativosService,
    private fb: UntypedFormBuilder
  ) { }



  public clienteForm: UntypedFormGroup = this.fb.group({
    id_cliente_documento: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    apellido: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    telefono: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],

  })

  public clienteFormEdit: UntypedFormGroup = this.fb.group({
    id_cliente_documento: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    apellido: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    telefono: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],

  })


  ngOnInit(): void {
    this.tempData = this.rows;
    this.kitchenSinkRows = this.rows;
    this.getClientes();
  }

   //! ------------- GET Y SET PARA EL BUSCADOR ------------- 
   get filterRows(): any {
    return this._filterRows;
  }

  set filterRows(value) {
    this._filterRows = value;
  }

  modalOpen(modal) {
    this.modalService.open(modal, {
      centered: true,
    });
  }

  getClientes() {
    this.clientesInformativosService.getData().subscribe(
      (res: any) => {
        this.rows = res;
        console.log(res);
        this.filterRows = res;
      }
    )
  }
  createCliente() {
    this.cliente = {
      id_cliente_documento: this.clienteForm.value.id_cliente_documento,
      nombre: this.clienteForm.value.nombre,
      apellido: this.clienteForm.value.apellido,
      telefono: this.clienteForm.value.telefono,
    };

    this.clientesInformativosService.createCliente(this.cliente).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cliente creado",
          text: "El cliente se ha creado correctamente",
          showConfirmButton: false,
          timer: 1000,
        });

        this.modalService.dismissAll();
        this.clienteForm.reset();
        this.getClientes();
      },
      (err: any) => {
        console.log("No se pudo guardar");
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error, por favor intente nuevamente",
          confirmButtonText: "Ok",
        });
      }
    );
  }

  getClienteData(row) {
    console.log(row, "Este es el evento") 
    this.clienteFormEdit.controls['nombre'].setValue(row.nombre)
    this.clienteFormEdit.controls['apellido'].setValue(row.apellido)
    this.clienteFormEdit.controls['id_cliente_documento'].setValue(row.id_cliente_documento)
    this.clienteFormEdit.controls['telefono'].setValue(row.telefono)
    this.idEdit = row.id_cliente_documento
  }

  
  updateCliente() {
   
    let newCliente = {
      nombre: this.clienteFormEdit.value.nombre,
      apellido: this.clienteFormEdit.value.apellido,
      telefono: this.clienteFormEdit.value.telefono,
      id: this.idEdit
    }
    console.log(newCliente)    
    this.clientesInformativosService.updateCliente(this.idEdit,newCliente).subscribe(
      (res:any)=>{
        console.log(res)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Modificado con exito",
          showConfirmButton: false,
          timer: 1000,
        });
        this.getClientes();
        this.modalService.dismissAll();       
      }
    )
  }

  //! ------------- BUSCADOR DE CATEGORIA ------------- 
filterUpdate(event) {
  const val = event.target.value.toLowerCase();

  const filterData = this.rows.filter((item: any) => {
    const filterData =
    item.id_cliente_documento.toString().toLowerCase().includes(val) ||
    item.nombre.toString().toLowerCase().includes(val) ||
    item.apellido.toString().toLowerCase().includes(val) ||
    item.telefono.toString().toLowerCase().includes(val); ; 
    return filterData;
  });

  // update the rows
  this.filterRows = filterData;

  console.log(filterData);
}

//! ------------- VALIDACIONES DE CAMPOS Y BOTONES------------- 

validField(field: string) {
  return (
    this.clienteForm.controls[field].errors &&
    this.clienteForm.controls[field].touched
  );
}

editValidField(field: string) {
  return (
    this.clienteFormEdit.controls[field].errors &&
    this.clienteFormEdit.controls[field].touched
  );
}


}

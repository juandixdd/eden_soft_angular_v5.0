import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { CategoriaService } from "app/modules/services/categoria/categoria.service";
import { PedidosService } from "app/modules/services/pedidos/pedidos.service";
import { ProductosService } from "app/modules/services/productos/productos.service";
import moment from "moment";
import { of } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-pedidos-cliente',
  templateUrl: './pedidos-cliente.component.html',
  styleUrls: ['./pedidos-cliente.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PedidosClienteComponent implements OnInit {
  public selectedOption = 10; //? Este es el selector de cuantas filas quieres ver en la tabla, en este caso, 10.
  public ColumnMode = ColumnMode; //? Esto es para que cuando selecciones una fila, se seleccione la fila y no el boton.
  private tempData = []; //? Estas son cosas del buiscador (Que no funciona)
  public kitchenSinkRows: any;

  categorias: any;
  rows: any = [];
  product: any = {};
  selectMultiSelectedEvent: any;
  selectMultiSelected: any;
  selectBasic: any;
  categoryId: any;
  imgUrl: any;
  imgName: any;
  row: any;
  detallesData: any = [];
  cotizaciones: any;
  options: any = [];
  productInfo = {};
  clientData: any = {};
  todayDate = moment().format('YYYY-MM-DD');
  public dateValidator: boolean = true; 
  userId= localStorage.getItem('userId');
  _filterRows: any = [];

  constructor(
    private modalService: NgbModal,
    private productosService: ProductosService,
    private pedidosService: PedidosService,
    private fb: UntypedFormBuilder
  ) {}

  public productForm: UntypedFormGroup = this.fb.group({
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    precio: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    categoria: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    imagen: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    estado: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
  });

  public switchForm: UntypedFormGroup = this.fb.group({
    estado:[]
  })

  ngOnInit(): void {
    this.getPedidos();

    console.log(this.todayDate);
  }

    //! ------------- GET Y SET PARA EL BUSCADOR ------------- 
    get filterRows(): any {
      return this._filterRows;
    }
  
    set filterRows(value) {
      this._filterRows = value;
    }

  getPedidos() {
    this.pedidosService.getPedidoByCedula(this.userId).subscribe((res: any) => {
      res.forEach((item) => {
        console.log(item);
        
         item.formcontrol = new UntypedFormControl(item.estado);
         this.switchForm.addControl(item.id_pedido, item.formcontrol)
       });
      this.rows = res;
      console.log(this.rows);
      this.filterRows = res;
    });
  }
  
  getPedidosById(id: number){
    this.pedidosService.getDataById(id).subscribe(
      (res: any)=>{
        this.clientData = {
          cedula: res[0].id_cliente_documento,
          nombreCliente: res[0].cliente,
          telefono: res[0].telefono
        }
        this.detallesData = res
        console.log(this.detallesData)
        if (this.detallesData.length > 0){
          this.contPrecioTotal = this.detallesData[0].precio_total
        }
      }
    )
  }

  modalOpen(modal) {
    //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }

  getProducts() {
    this.productosService.getData().subscribe((res) => {
      this.rows = res;
      console.log(this.rows);
    });
  }

  onChange(event) {
    this.categoryId = event.id;
    console.log(this.categoryId);
  }



  defineProductInfo(id) {
    this.productosService.getDataById(id).subscribe((res: any) => {
      this.productInfo = res[0];
    });
  }

  createProduct() {
    this.product = {
      nombre: this.productForm.value.nombre,
      precio: this.productForm.value.precio,
      categoria: this.categoryId,
      imagen: this.productForm.value.imagen,
      estado: 1,
    };

    this.productosService.createProduct(this.product).subscribe(
      (res: any) => {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Producto creado",
          text: "El producto se ha creado correctamente",
          showConfirmButton: false,
          timer: 1000,
        });

        this.modalService.dismissAll();
        this.productForm.reset();
        this.getProducts();
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

  contPrecioTotal: any = 0;
  getCotizacionesById(id) {
    console.log(id);
    this.pedidosService.getCotizacionesById(id).subscribe((res: any) => {
      this.detallesData = res;
      console.log(this.detallesData);
      if (this.detallesData.length > 0) {
        this.contPrecioTotal = this.detallesData[0].precio_total;
      }
    });
  }

  switchEvent({target}, row){
    let checked = target.checked;
    let status = {
      estado: checked
    }
    console.log(status);
    setTimeout(()=>{
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Cambiarás el estado del pedido",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cambiar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("sipi");
          this.pedidosService.anularCotizacion(row.id_pedido, status).subscribe(
            (res:any) =>{
              if(res.status === 200){
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Se cambio el estado del pedido',
                  showConfirmButton: false,
                  timer: 1000
                })
                this.getPedidos()
              }
            }
          )
            
        }
        else {
          console.log("nopi");
          this.getPedidos();
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'No se cambió el estado del pedido',
            showConfirmButton: false,
            timer: 1000
          })
        }
      })
    },100)
  }

  //! ------------- BUSCADOR DE MIS PEDIDOS ------------- 
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    const filterData = this.rows.filter((item: any) => {
      const filterData =
      item.id_pedido.toString().toLowerCase().includes(val) ||
      item.nombre.toString().toLowerCase().includes(val) ||
      item.fecha_entrega.toLowerCase().includes(val) ||
      item.fecha_registro.toLowerCase().includes(val) ||
      item.precio_total.toString().toLowerCase().includes(val); 
      return filterData;
    });

    // update the rows
    this.filterRows = filterData;

    console.log(filterData);
  }



}

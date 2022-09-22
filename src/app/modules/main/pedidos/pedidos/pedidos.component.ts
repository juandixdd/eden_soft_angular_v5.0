import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { CategoriaService } from "app/modules/services/categoria/categoria.service";
import { PedidosService } from "app/modules/services/pedidos/pedidos.service";
import { ProductosService } from "app/modules/services/productos/productos.service";
import { of } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: "app-pedidos",
  templateUrl: "./pedidos.component.html",
  styleUrls: ["./pedidos.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PedidosComponent implements OnInit {
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

  constructor(
    private modalService: NgbModal,
    private productosService: ProductosService,
    private pedidosService: PedidosService,
    private fb: FormBuilder
  ) {}

  public productForm: FormGroup = this.fb.group({
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

  ngOnInit(): void {
    this.getPedidos();
    console.log('holis');
  }

  getPedidos() {
    this.pedidosService.getData().subscribe((res: any) => {
      this.rows = res;
      console.log(this.rows);
    });
  }
  
  getPedidosById(id: number){
    this.pedidosService.getDataById(id).subscribe(
      (res: any)=>{
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

  options: any = [];
  productInfo = {};

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
}
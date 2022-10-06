import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { CategoriaService } from 'app/modules/services/categoria/categoria.service';
import { PedidosService } from 'app/modules/services/pedidos/pedidos.service';
import { ProductosService } from 'app/modules/services/productos/productos.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CotizacionComponent implements OnInit {

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
  cotizacionInfoUsuario: any;

  constructor(
    private modalService: NgbModal,
    private productosService: ProductosService,
    private categoriasService: CategoriaService,
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

  public switchForm: FormGroup = this.fb.group({
    estado:[]
  })
  ngOnInit(): void {
    this.getCategorias();
    this.getCotizaciones();
    
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

  async getCategorias() {
    this.categoriasService.getData().subscribe((res: any) => {
      this.selectBasic = of(res).pipe();
      console.log(this.selectBasic);

      /*

        for (let i in this.selectBasic) {
          console.log(this.selectBasic[i].nombre);
          this.options.push(this.selectBasic[i].nombre);
        }

        console.log(this.options)
        */
    });
  }

  productInfo = {};

  defineProductInfo(id) {
    this.productosService.getDataById(id).subscribe(
      (res:any)=>{
        this.productInfo=res[0]
      }
    )
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

  getCotizaciones(){
    this.pedidosService.getCotizaciones().subscribe(
      (res: any) =>{
         res.forEach((item) => {
          console.log(item);
          
           item.formcontrol = new FormControl(item.estado);
           this.switchForm.addControl(item.id_pedido, item.formcontrol)
         });
        this.rows = res
      }
    )
  
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
        text: "Cambiarás el estado de la cotizacion",
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
                  title: 'Se cambio el estado de la cotizacion',
                  showConfirmButton: false,
                  timer: 1000
                })
                this.getCotizaciones()
              }
            }
          )
            
        }
        else {
          console.log("nopi");
          this.getCotizaciones();
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'No se cambió el estado de la venta',
            showConfirmButton: false,
            timer: 1000
          })
        }
      })
    },100)
  }
  
  contPrecioTotal: any = 0;

  getCotizacionesById(id){
    console.log(id)
    //? trae las cotizaciones con los productos
    this.pedidosService.getCotizacionesById(id).subscribe(
      (res:any) =>{
        this.detallesData = res
        console.log(this.detallesData)
        if (this.detallesData.length > 0){
          this.contPrecioTotal = this.detallesData[0].precio_total
        }
      }
    )
    //? trae las contizaciones con la info del usuario
    this.pedidosService.getCotizacionesByIdInfo(id).subscribe(
      (res:any) =>{
        this.cotizacionInfoUsuario = res[0];
        console.log(this.cotizacionInfoUsuario, "xddddd")
      }
    )
  }

}

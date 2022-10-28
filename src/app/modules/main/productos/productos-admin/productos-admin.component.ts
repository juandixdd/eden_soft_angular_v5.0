import { prepareSyntheticPropertyName } from "@angular/compiler/src/render3/util";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { CategoriaService } from "app/modules/services/categoria/categoria.service";
import { ProductosService } from "app/modules/services/productos/productos.service";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";

@Component({
  selector: "app-productos-admin",
  templateUrl: "./productos-admin.component.html",
  styleUrls: ["./productos-admin.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ProductosAdminComponent implements OnInit {
  //! Oes, cuando no entiendan para que es una cosa, le dan ctrl + f para buscar en el codigo de html, tal vez ahí tengan una mjeor noción de para que sirve cada cosa.

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
  idEdit: any;
  productUpdate: any= null;
  categoriaData: any;
  productData: any;
  editProduct: any = {};
  categoriaId: any;
  timer: boolean = false;
  options: any = [];
  productInfo = {};
  editProducto:any = {};
  nombreCategoria: any;

  constructor(
    private modalService: NgbModal,
    private productosService: ProductosService,
    private categoriasService: CategoriaService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategorias();
  }

  public productForm: FormGroup = this.fb.group({
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    precio: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    id: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    imagen: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
  });

  public productFormEdit: FormGroup = this.fb.group({
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    precio: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    id: [
      "",
      [Validators.required],
    ],
    imagen: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
  });

  public switchForm: FormGroup = this.fb.group({
    estado:[]
  })
  
  modalOpen(modal) { //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }

  getProducts() {
    this.productosService.getData().subscribe((res: any) => {
      res.forEach((item) => {
        console.log(item);    
         item.formcontrol = new FormControl(item.estado);
         this.switchForm.addControl(item.id, item.formcontrol)
       });
      this.rows = res;
      console.log(this.rows);
    });
  }

  getCategorias() {
    this.categoriasService.getData().subscribe((res: any) => {
      this.selectBasic = of(res).pipe();
      console.log(this.selectBasic);

    });
  }

  
  
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

  getRowData(row) {
    this.editProducto={
      nombre : row.nombre,
      precio: row.precio,
      id: row.id,
      imagen: row.imagen,
    }

    this.productosService.getDataById(row.id).subscribe(
      (res:any)=>{
        this.nombreCategoria = res[0].nombre
        this.productFormEdit.controls['nombre'].setValue(row.nombre);
        this.productFormEdit.controls['precio'].setValue(row.precio);
        this.productFormEdit.controls['id'].setValue(this.nombreCategoria);
        this.productFormEdit.controls['imagen'].setValue(row.imagen);
        console.log(res);
      }
      
      
    )
      this.productFormEdit.controls['nombre'].setValue(row.nombre);
      this.productFormEdit.controls['precio'].setValue(row.precio);
      this.productFormEdit.controls['id'].setValue(row.id);
      this.productFormEdit.controls['imagen'].setValue(row.imagen);
  }
  
  onChange(event) {
    this.categoryId = event.id;
    console.log(this.categoryId);
  }

  updateData() {
    try {
      let edit = {
        nombre:this.productFormEdit.value.nombre,
        precio:this.productFormEdit.value.precio,
        id:this.categoryId || this.editProducto.id,
        imagen:this.productFormEdit.value.imagen

      }
      this.productosService.updateData(this.editProducto.id, edit).subscribe(
        (res: any) => {
          console.log(res);
          this.productosService.updateData(this.editProducto.id, edit).subscribe(
            (res: any) => {
              console.log(res);
              
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Actualizacion de Datos Exitosa',
                showConfirmButton: false,
                timer: 1500
              });
              this.getProducts();
              this.modalService.dismissAll();
            }
          )

        }
      )
      

    } catch (error) {
      console.log(error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Opps, Algo Salio mal, intentalo de nuevo',
        showConfirmButton: true,
        confirmButtonText: "Ok"
      })
    }

  }


  deleteProducto(id) {
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
        this.productosService.deleteData(id).subscribe(
          (res) => {
            let data: any = res;
            this.productInfo = res;
            this.getProducts();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Permiso eliminado con exito',
              showConfirmButton: false,
              timer: 1000
            });
          }
        );
      }
    })
  }


  confirmAlert() {
    //? Esta es la funcion que abre el sweetAlert de confirmacion.
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        Swal.fire("Eliminado!", "El producto ha sido eliminada.", "success");
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
        text: "Cambiarás el estado de este producto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cambiar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productosService.cambiarEstado(row.id, status).subscribe(
            (res:any) =>{
              if(res.status === 200){
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Se cambio el estado del producto',
                  showConfirmButton: false,
                  timer: 1000
                })
                this.getProducts()
              }
            }
          )
            
        }
        else {
          this.getProducts();
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'No se cambió el estado del producto',
            showConfirmButton: false,
            timer: 1000
          })
        }
      })
    },100)
  }
  validField(field: string) {
    return (
      this.productForm.controls[field].errors &&
      this.productForm.controls[field].touched
    );
  }

  editValidField(field: string) {
    return (
      this.productFormEdit.controls[field].errors &&
      this.productFormEdit.controls[field].touched
    );
  }





}

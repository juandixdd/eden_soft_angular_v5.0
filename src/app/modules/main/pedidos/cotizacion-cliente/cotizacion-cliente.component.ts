import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { CategoriaService } from 'app/modules/services/categoria/categoria.service';
import { PedidosService } from 'app/modules/services/pedidos/pedidos.service';
import { ProductosService } from 'app/modules/services/productos/productos.service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cotizacion-cliente',
  templateUrl: './cotizacion-cliente.component.html',
  styleUrls: ['./cotizacion-cliente.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CotizacionClienteComponent implements OnInit {

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
  idUser = localStorage.getItem("userId")
  idPedido : any;
  estado: any;
  _filterRows: any;

  constructor(
    private modalService: NgbModal,
    private productosService: ProductosService,
    private categoriasService: CategoriaService,
    private pedidosService: PedidosService,
    private fb: UntypedFormBuilder
  ) { }
  public anularForm: UntypedFormGroup = this.fb.group({
    estado: [
      "",
      [],
    ],
    
  });

  ngOnInit(): void {
    this.getCategorias();
    this.getCotizacionesByUserId(this.idUser)
  }

  //? Get y Set para el buscador
  get filterRows(): any {
    return this._filterRows;
  }

  set filterRows(value) {
    this._filterRows = value;
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

  cambiarEstado(){
    this.estado = this.anularForm.value
    console.log(this.estado)
    
  }

  idFunction(id){
    this.idPedido = id
  }

  getCotizaciones(){
    this.pedidosService.getCotizaciones().subscribe(
      (res: any) =>{
        this.rows = res
      }
    )
  
  }

  getCotizacionesByUserId(id){
    this.pedidosService.getCotizacionesByUserId(id).subscribe(
      (res: any) =>{
        this.rows = res
        console.log(this.rows)
        this.estado = true;
        this._filterRows = res;
      }
    )
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
        console.log(this.cotizacionInfoUsuario)
      }
    )
  }

  switchEvent(row) {
    let estado ={
      status: row.estado
    } 
    console.log(row.estado, "amaaa");

    if (estado.status === 0) {
      Swal.fire({
        icon: "warning",
        confirmButtonText: "Ok",
        title: "Ops, no se puede volver a activar una cotización",
      });
    } else if (estado.status === 1) {
      setTimeout(() => {
        Swal.fire({
          title: "¿Estas seguro?",
          text: "Anularas la cotización",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Anular",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            console.log("sipi");
            this.pedidosService
              .anularCotizacion(row.id_pedido, status)
              .subscribe((res: any) => {
                if (res.status === 200) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Se anulo la cotización",
                    showConfirmButton: false,
                    timer: 1000,
                  });
                  this.getCotizacionesByUserId(row.id_cliente_documento);
                }
              });
          } else {
            console.log("nopi");
            this.getCotizacionesByUserId(row.id_cliente_documento);
            Swal.fire({
              position: "top-end",
              icon: "warning",
              title: "No se anulo la cotización",
              showConfirmButton: false,
              timer: 1000,
            });
          }
        });
      }, 100);
    }
  }

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    const filterData = this.rows.filter((item: any) => {
      const filterData =
      item.id_pedido.toString().toLowerCase().includes(val) ||
      item.fecha_entrega.toLowerCase().includes(val) ||
      item.precio_total.toString().toLowerCase().includes(val); 
      return filterData;
    });

    // update the rows
    this._filterRows = filterData;

    console.log(filterData);
  }

}


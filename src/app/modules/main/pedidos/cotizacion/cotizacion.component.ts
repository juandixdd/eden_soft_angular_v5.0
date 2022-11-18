import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  _filterRows: any;

  constructor(
    private modalService: NgbModal,
    private productosService: ProductosService,
    private categoriasService: CategoriaService,
    private pedidosService: PedidosService,
    private fb: UntypedFormBuilder
  ) {}

  public switchForm: UntypedFormGroup = this.fb.group({
    estado:[]
  })
  ngOnInit(): void {  
    this.getCategorias();
    this.getCotizaciones();
    
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

  getCotizaciones(){
    this.pedidosService.getCotizaciones().subscribe(
      (res: any) =>{
         res.forEach((item) => {
          console.log(item);
          
           item.formcontrol = new UntypedFormControl(item.estado);
           this.switchForm.addControl(item.id_pedido, item.formcontrol)
         });
        this.rows = res;
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

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    const filterData = this.rows.filter((item: any) => {
      const filterData =
      item.id_pedido.toString().toLowerCase().includes(val) ||
      item.id_cliente_documento.toString().toLowerCase().includes(val) ||
      item.fecha_entrega.toLowerCase().includes(val) ||
      item.precio_total.toString().toLowerCase().includes(val); ; 
      return filterData;
    });

    // update the rows
    this.filterRows = filterData;

    console.log(filterData);
  }

}

import { Component, OnInit } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { ProductosService } from '../../services/productos/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  products: any;

  constructor(    
    private _coreConfigService: CoreConfigService,
    private productosService: ProductosService
    ) { 
    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: false
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productosService.getData().subscribe(
      (res)=>{
        this.products = res;
        console.log(this.products);
      }
    )
  }

}

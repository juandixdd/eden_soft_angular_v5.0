import { Component, OnInit } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService } from 'app/modules/services/productos/productos.service';
import { parse } from 'path';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  products: any;
  carritoProductsIds: any = [];
  arrayProducts: any;
  getLocalStorageWishList: any;
  carritoProductItems: any;


  constructor(
    private _coreConfigService: CoreConfigService,
    private productosService: ProductosService,
    private modalService: NgbModal,
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

  modalOpen(modal) {
    //? Esta es la funcion que abre las modales.
    this.modalService.open(modal, {
      centered: true,
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.saveWishlist()
  }



  saveWishlist() {
    this.getLocalStorageWishList = JSON.parse(localStorage.getItem("wishList")) || [];
    console.log("That's the wishlist of localstorage: ", this.getLocalStorageWishList)
  }

  getProducts() {
    this.productosService.getData().subscribe(
      (res) => {
        this.products = res;
        console.log(this.products);
      }
    )
  }



  addCarrito(event) {
    /* this.carritoProductsIds.push(event); */
    this.productosService.getProductInObject(event).subscribe(
      (res: any) => {
        this.getLocalStorageWishList.push(res)
        localStorage.setItem("wishList", JSON.stringify(this.getLocalStorageWishList))
      }
    )

    //? Para convertir json a array
    /* array = JSON.parse(array); */

    /* this.carritoProductsIds.forEach((item: any) => {
      console.log(item);
      this.productosService.getProductInObject(item).subscribe(
        (res: any) => {
          this.wishList.push(res);
          console.log(this.wishList)
        }
      )
    }) */
  }



}

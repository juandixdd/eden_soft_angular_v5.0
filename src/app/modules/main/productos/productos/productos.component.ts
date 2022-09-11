import { Component, OnInit } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService } from 'app/modules/services/productos/productos.service';
import { count } from 'console';
import { parse } from 'path';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  products: any;
  carritoProductsIds: any = [];
  arrayProducts: any;
  wishListIds: any = [];
  productxd = [];
  public items = JSON.parse(localStorage.getItem("wishList")) || [];

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
  }


  getProducts() {
    this.productosService.getData().subscribe(
      (res) => {
        this.products = res;
        console.log(this.products);
      }
    )
  }

  /*  public item = {
     itemName: '',
     itemQuantity: ''
   }; */

  saveProducts() {
    localStorage.setItem("wishList", JSON.stringify(this.items))
  }

  saveProductsEvent({ target }) {
    const value = target.value;
    const name = target.id;
    let altArray = JSON.parse(localStorage.getItem("wishList"));
    let modItem = altArray.find((item) => item.itemName === name)
    modItem.itemQuantity = value;
    let index = altArray.findIndex((item) => item.itemName === name);
    altArray[index] = modItem;
    localStorage.setItem("wishList", JSON.stringify(altArray));
  }

  // public


  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add Item
   */
  addItem(id, name) {
    let wishList = JSON.parse(localStorage.getItem("wishList"))
    let item = wishList.filter((item) => item.itemName === name)
    if (item.length === 0) {
      this.items.push({
        itemId: id,
        itemName: name,
        itemQuantity: 1
      });
      this.saveProducts();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Hecho!",
        text: "Se agregó el producto al carrito",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Oops...",
        text: "Ya agregaste este producto al carrito",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  }

  /**
   * DeleteItem
   *
   * @param id
   */
  deleteItem(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items.indexOf(this.items[i]) === id) {
        this.items.splice(i, 1);
        break;
      }
    }
  }



}

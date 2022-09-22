import { Component, OnInit } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-pago",
  templateUrl: "./pago.component.html",
  styleUrls: ["./pago.component.scss"],
})
export class PagoComponent implements OnInit {
  // public
  public items = [];

  constructor() {}

  ngOnInit(): void {
    this.items = JSON.parse(localStorage.getItem("wishList"))
    console.log(this.items)
  }

  
  public basicDPdata: NgbDateStruct;

  

  public item = {
    itemName: "",
    itemQuantity: "",
    itemCost: "",
  };

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add Item
   */
  addItem() {
    this.items.push({
      itemId: "",
      itemName: "",
      itemQuantity: "",
      itemCost: "",
    });
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
  generarPedido(){

  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-informative-client',
  templateUrl: './create-informative-client.component.html',
  styleUrls: ['./create-informative-client.component.scss']
})
export class CreateInformativeClientComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  cedula: any = this.activatedRoute.snapshot.params.cedula;
  clientData = {};
  productsForm;

  ngOnInit(): void {
    this.userForm.controls['id_cliente_documento'].setValue(this.cedula);
  }

  public userForm: FormGroup = this.fb.group({
    id_cliente_documento: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    apellido: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    telefono: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],

  })

  validField(field: string) {
    return this.userForm.controls[field].errors &&
      this.userForm.controls[field].touched;
  }

  createVenta() {
    this.clientData = {
      id_cliente_documento: this.userForm.value.id_cliente_documento,
      nombre: this.userForm.value.nombre,
      apellido: this.userForm.value.apellido,
      telefono: this.userForm.value.telefono
    }

    console.log(this.clientData);

  }

    // public
    public items = [{ itemId: '', itemName: '', itemQuantity: '', itemCost: '' }];

    public item = {
      itemName: '',
      itemQuantity: '',
      itemCost: ''
    };
  
    // Public Methods
    // -----------------------------------------------------------------------------------------------------
  
    /**
     * Add Item
     */
    addItem() {
      this.items.push({
        itemId: '',
        itemName: '',
        itemQuantity: '',
        itemCost: ''
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


}

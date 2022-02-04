import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent, id } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { PlacesService } from 'app/modules/main/services/places/places.service';
import { GymsService } from 'app/modules/main/services/gyms/gyms.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { place } from '../../../../../core/models/place';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-place-list-page',
  templateUrl: './place-list-page.component.html',
  styleUrls: ['./place-list-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlaceListPageComponent implements OnInit {

  rows: any = [];
  data: any = [];
  cols: any = [];
  rowId: number;
  public selectedOption = 10;
  public searchValue = '';
  public selectedStatus = [];
  private tempData: any = [];
  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private placesService: PlacesService, private gymsService: GymsService, private modalService: NgbModal, private fb: FormBuilder,private activedRoute: ActivatedRoute) { }

  place: place = {
    name: "",
    adress: "",
    manager_name: "",
    telephone: undefined,
  }

  placeUpdate: place = {};

   /* Place Form */
   public placeForm: FormGroup = this.fb.group({
    name: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    manager_name: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    telephone: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    adress: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  });

  /* Edit Form */
  public editForm: FormGroup = this.fb.group({
    name: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    manager_name: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    telephone: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    adress: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
  });


  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces() {
    this.placesService.getData().subscribe((data) => {
      this.rows = data;

      this.tempData = data;
      this.cols = Object.keys(data[0]);
    });
  }

  deletePlace(id: number) {
    this.placesService.deletePlace(id).subscribe((data) => {
      const resp: any = data;
      if (resp.status) {
        Swal.fire(
          'Eliminada!',
          'La place ha sido eliminada.',
          'success'
        );
        console.log(`place eliminada`);
        this.getPlaces();
      } else {
        console.log('Error');
      }
    });
  }

  confirmDeletePlace(id: number) {
    Swal.fire({
      title: '¿Seguro?',
      text: "Esta acción eliminará el gimnasio",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Eliminar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePlace(id);
      }
    })
  }

  // modal Open Form
  modalOpenForm(modalForm) {
    this.modalService.open(modalForm);
  }
  
  modalOpenEdit(modalEdit){
    this.modalService.open(modalEdit);
  }

  getPlace(place: any) {
    this.rowId = place.id;
    this.editForm.controls['name'].setValue(place.name);
    this.editForm.controls['manager_name'].setValue(place.manager_name);
    this.editForm.controls['telephone'].setValue(place.telephone);
    this.editForm.controls['adress'].setValue(place.adress);
  }	
  


  validField(field: string) {
    return this.placeForm.controls[field].errors &&
      this.placeForm.controls[field].touched;
  }

  

  EditValidField(field: string) {
    return this.editForm.controls[field].errors &&
      this.editForm.controls[field].touched;
  }

  saveNewPlace() {

    this.place.name = this.placeForm.controls['name'].value;
    this.place.manager_name = this.placeForm.controls['manager_name'].value;
    this.place.telephone = this.placeForm.controls['telephone'].value;
    this.place.adress = this.placeForm.controls['adress'].value;

    this.placesService.addPlace(this.place).subscribe(
      (res) => {
        let data: any = res;
        this.ngOnInit();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La sede ha sido creada',
          showConfirmButton: false,
          timer: 1000
        })
        this.placeForm.reset();
      },
      (err) => console.log(err)
    );
  }

  getOnePlace() {
    this.placesService.getPlace(this.rowId).subscribe((data) => {
      this.place = data;
    });
  }
  

  updatePlace() {
    

    this.placeUpdate.name = this.editForm.controls['name'].value;
    this.placeUpdate.manager_name = this.editForm.controls['manager_name'].value;
    this.placeUpdate.telephone = this.editForm.controls['telephone'].value;
    this.placeUpdate.adress = this.editForm.controls['adress'].value;

    this.placesService.updatePlace(this.rowId, this.placeUpdate).subscribe(
      (res) => {
        let data: any = res;
        this.modalService.dismissAll('modalEdit');
        this.getPlaces();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'La sede ha sido actualizada',
          showConfirmButton: false,
          timer: 1000
        })
      },
      (err) =>{
        console.log(err)
      } 
    );
    
  }

}

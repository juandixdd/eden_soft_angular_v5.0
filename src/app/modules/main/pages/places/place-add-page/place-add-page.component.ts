import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { place } from 'app/core/models/place';
import { PlacesService } from 'app/modules/main/services/places/places.service';

@Component({
  selector: 'app-place-add-page',
  templateUrl: './place-add-page.component.html',
  styleUrls: ['./place-add-page.component.scss']
})
export class PlaceAddPageComponent implements OnInit {
  edit: boolean = false;

  place:place = {
    name: "",
    adress: "",
    telephone: undefined,
    gyms: {
      id: undefined
    }
  }

  constructor(
    private placeService: PlacesService,
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  public sedeForm: FormGroup = this.fb.group({
    name: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)],
    ],
    adress: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ],
    telephone: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ]
  })

  get f() {
    return this.sedeForm.controls;
  }

  ngOnInit(): void {
    const params = this.activateRoute.snapshot.params;
    if (params.id) {
      this.placeService.getPlace(params.id).subscribe(
        (res) => {
          console.log(res);
          this.place = res;
          this.edit = true;
        },
        (err) => console.log(err)
      );
    }
  }

  savePlace(){
    this.placeService.addPlace(this.place).subscribe(
      (res) => {
        this.confirmSaveAlert();
        this.router.navigate(["/place"]); 
      },
      (err) => console.log(err)
    );
  }

  updatePlace(){
    this.placeService.updatePlace(this.place.id, this.place).subscribe(
      (res) => {
        this.router.navigate(["/place"]);
      },
      (err) => console.log(err)
    );
  }

  confirmSaveAlert(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se agregó la place',
      showConfirmButton: false,
      timer: 1500
    })
  }

  confirmUpdateAlert(){
    Swal.fire({
      title: '¿Seguro?',
      text: "Esta acción actualizará la place",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Actualizar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.updatePlace();
        this.sucessAlert();
      }
    })
  }

  sucessAlert(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'La place ha sido actualizado',
      showConfirmButton: false,
      timer: 1500
    })
  }

}

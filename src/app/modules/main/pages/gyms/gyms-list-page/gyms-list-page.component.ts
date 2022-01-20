import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GymsService } from 'app/modules/main/services/gyms/gyms.service';
import Swal from 'sweetalert2';
import { gym } from 'app/core/models/gym';

@Component({
  selector: 'app-gyms-list-page',
  templateUrl: './gyms-list-page.component.html',
  styleUrls: ['./gyms-list-page.component.scss']
})
export class GymsListPageComponent implements OnInit {

  constructor(
    public customeService: GymsService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private gymService: GymsService
  ) { }

  gym: gym = {
    name: "",
    manager_name: "",
    telephone: undefined
  }

  ngOnInit(): void {
    this.gymService.getData().subscribe((data) => {
      res => {
        this.gym = res;
      }
      err => {
        console.error(err);
      }
    })
  }

  public gymForm: FormGroup = this.fb.group({
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
  });

  validField(field: string){
    return this.gymForm.controls[field].errors &&
            this.gymForm.controls[field].touched;
  }



  createGym() {
    
    /* Swal.fire({
      title: 'Crear Gimnasio',
      html: `<input type="text" id="name" class="swal2-input" placeholder="Nombre">
             <input type="text" id="manager_name" class="swal2-input" placeholder="Nombre del encargado">
             <input type/* ="text" id="telephone" class="swal2-input" placeholder="Telefono">`,
      confirmButtonText: 'Crear',
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name')['value'];
        const manager_name = Swal.getPopup().querySelector('#manager_name')['value'];
        const telephone = Swal.getPopup().querySelector('#telephone')['value'];
        if (!name || !manager_name || !telephone) {
          Swal.showValidationMessage(`Por favor validar todos los campos`)
        }
        return {
          name: name,
          manager_name: manager_name,
          telephone: telephone,
        }
      }
    }).then((result) => {
      if (result.value) {
        this.customeService.addGym(result.value).subscribe((resp) => {
          let data: any = resp;
          this.router.navigate([`/gyms/edit/${data.id}`]);
        })
      }
    })  */
  }

  confirmDeleteGym(id: number) {
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
        this.customeService.deleteGym(id).subscribe((data) => {
          const resp: any = data;
          if (resp.status) {
            this.ngOnInit();
            console.log(`Gimnasio eliminado`);
            Swal.fire(
              'Eliminado!',
              'El gimnasio ha sido eliminado',
              'success'
            );
          } else {
            console.log('Error');
          }

        });
      }
    })
  }
  updateGym(id: number) {
    this.router.navigate([`/gyms/edit/${id}`]);
  }


  saveNewGym() {
    this.gymService.addGym(this.gym).subscribe(
      (res) => {
        let data: any = res;
        this.router.navigate([`/gyms/edit/${data.id}`]);
        console.log(res);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El gimnasio ha sido creado',
          showConfirmButton: false,
          timer: 1000
        })
      },
      (err) => console.log(err)
    );
  }
 

  // modal Open Form
  modalOpenForm(modalForm) {
    this.modalService.open(modalForm);
  }
  
  /* modal.close('Accept click') */

}

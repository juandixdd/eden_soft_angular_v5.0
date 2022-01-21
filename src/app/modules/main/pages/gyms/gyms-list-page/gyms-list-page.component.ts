import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GymsService } from 'app/modules/main/services/gyms/gyms.service';
import Swal from 'sweetalert2';
import { gym } from 'app/core/models/gym';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-gyms-list-page',
  templateUrl: './gyms-list-page.component.html',
  styleUrls: ['./gyms-list-page.component.scss']
})
export class GymsListPageComponent implements OnInit {

  rows: any = [];
  data: any = [];
  cols: any = [];
  rowId: number;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public searchValue = '';
  public selectedStatus = [];
  private tempData: any = [];

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

  gymUpdate: gym = {};

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
  });

  ngOnInit(): void {
    this.getGyms();
    this.gymService.getData().subscribe((data) => {
      res => {
        this.gym = res;
      }
      err => {
        console.error(err);
      }
    })
  }

  getGyms(){
    this.gymService.getData().subscribe((data) => {
      this.rows = data;
      this.tempData = data;
      this.cols = Object.keys(data[0]);
      console.log(this.cols);
    });
  }

  validField(field: string){
    return this.gymForm.controls[field].errors &&
            this.gymForm.controls[field].touched;
  }
  
  editValidField(field: string){
    return this.editForm.controls[field].errors &&
            this.editForm.controls[field].touched;
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

  modalOpenForm(modalForm) {
    this.modalService.open(modalForm);
  }
  
  modalOpenEdit(modalEdit){
    this.modalService.open(modalEdit);
  }

  getOneGym() {
    this.gymService.getGym(this.rowId).subscribe((data) => {
      this.gym = data;
    });
  }

  getGym(gym: any) {
    this.rowId = gym.id;
    this.editForm.controls['name'].setValue(gym.name);
    this.editForm.controls['manager_name'].setValue(gym.manager_name);
    this.editForm.controls['telephone'].setValue(gym.telephone);
  }	

  saveNewGym() {

    this.gym.name = this.gymForm.controls['name'].value;
    this.gym.manager_name = this.gymForm.controls['manager_name'].value;
    this.gym.telephone = this.gymForm.controls['telephone'].value;

    this.gymService.addGym(this.gym).subscribe(
      (res) => {
        let data: any = res;
        console.log(res);
        this.ngOnInit();
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
 


  updateGym() {
    

    this.gymUpdate.name = this.editForm.controls['name'].value;
    this.gymUpdate.manager_name = this.editForm.controls['manager_name'].value;
    this.gymUpdate.telephone = this.editForm.controls['telephone'].value;

    this.gymService.updateGym(this.rowId, this.gymUpdate).subscribe(
      (res) => {
        // if(status==1){mostrar mensaje de exito}else{mostrar mensaje de error}
        let data: any = res;
        this.modalService.dismissAll('modalEdit');
        this.getGyms();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'El gimnasio ha sido actualizado',
          showConfirmButton: false,
          timer: 1000
        })
      },
      (err) =>{
        console.log(err)
      // {mostrar mensaje de error}
      } 
    );
    
  }

}

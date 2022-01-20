import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ClientsService } from 'app/modules/main/services/clients/clients.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clients-list-page',
  templateUrl: './clients-list-page.component.html',
  styleUrls: ['./clients-list-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientsListPageComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(public customeService: ClientsService, private router: Router) { }

  ngOnInit(): void {

  }

  

  createClient(){
    Swal.fire({
      title: 'Crear Cliente',
      html: `<input type="text" id="name" class="swal2-input" placeholder="Nombre">
             <input type="text" id="last_name" class="swal2-input" placeholder="Apellido">
             <input type="text" id="telephone" class="swal2-input" placeholder="Telefono">`,
      confirmButtonText: 'Crear',
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name')['value'];
        const last_name = Swal.getPopup().querySelector('#last_name')['value'];
        const telephone = Swal.getPopup().querySelector('#telephone')['value'];
        if (!name || !last_name || !telephone ) {
          Swal.showValidationMessage(`Por favor validar todos los campos`)
          return false;
        }
        else{
          return {
            name: name,
            last_name: last_name,
            telephone: telephone,
          }
        }
      }
    }).then((result) => {
      console.log(result.value);
      if (result.value) {
        this.customeService.addClient(result.value).subscribe( (resp) => {
          console.log(resp);
          let data:any = resp;
          this.router.navigate([`/clients/edit/${data.id}`]);
        })
      }
    })
  }

  confirmDeleteClient(id: number){
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
        this.customeService.deleteClient(id).subscribe((data) => {
          const resp: any = data;
          if(resp.status){
            Swal.fire(
              'Eliminado!',
              'El cliente ha sido eliminado.',
              'success'
            );
            console.log(`Gimnasio eliminado`);
            this.ngOnInit();
          }else{
            console.log('Error');
          }
    
        });
      }
    })
  }

  updateClient(id: number){
    this.router.navigate([`/clients/edit/${id}`]);
  }

}

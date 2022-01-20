import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import Swal from 'sweetalert2';
import { PlacesService } from 'app/modules/main/services/places/places.service';
import { GymsService } from 'app/modules/main/services/gyms/gyms.service';


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
  public selectedOption = 10;
  public searchValue = '';
  public selectedStatus = [];
  private tempData: any = [];
  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private placesService: PlacesService, private gymsService: GymsService) { }

  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces(){
    this.placesService.getData().subscribe((data) => {
      this.rows = data;
      /* console.log(JSON.stringify(this.rows)); */

      this.tempData = data;
      this.cols = Object.keys(data[0]);
      console.log(this.cols);
    });
  }

  deletePlace(id: number) {
    this.placesService.deletePlace(id).subscribe((data) => {
      const resp: any = data;
      if(resp.status){
        Swal.fire(
          'Eliminada!',
          'La place ha sido eliminada.',
          'success'
        );
        console.log(`place eliminada`);
        this.getPlaces();
      }else{
        console.log('Error');
      }
    });
  }

  confirmDeletePlace(id: number){
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

}

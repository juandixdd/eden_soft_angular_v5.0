import { Component, Input, OnInit,  ViewChild, ViewEncapsulation} from "@angular/core";
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Router } from "@angular/router";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {

  
  //inputs
  @Input() customeService;
  @Input() customeDelete;
  @Input() customeCreate;
  @Input() customeUpdate;
  @Input() customeAddTitle: string = "Agregar";
  @Input() gym_id: number = 0;
  @Input() user_id: number = 0;
  @Input() tableType: string;
  

  rows: any = [];
  data: any = [];
  cols: any = [];
  public selectedOption = 10;
  public searchValue = '';
  public selectedStatus = [];
  private tempData: any = [];
  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    if(this.gym_id == 0){
      this.customeService.getData().subscribe((data) => {
        this.rows = data;
  
        this.tempData = data;
        this.cols = Object.keys(data[0]);
      });
    }
    else{
      this.customeService.getDataByGym(this.gym_id).subscribe((data) => {
        this.rows = data;
  
        this.tempData = data;
        this.cols = Object.keys(data[0]);
      });
    }

  }



}



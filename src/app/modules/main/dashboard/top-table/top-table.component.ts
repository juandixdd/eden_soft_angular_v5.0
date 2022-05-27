import { Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-top-table',
  templateUrl: './top-table.component.html',
  styleUrls: ['./top-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopTableComponent implements OnInit {

  cardData: any ={
    views: 2300
  };

  constructor() { }

  ngOnInit(): void {
  }

}

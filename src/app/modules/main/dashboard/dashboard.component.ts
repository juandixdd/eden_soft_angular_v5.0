import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  cardData: any ={
    views: 2300
  };

  constructor() { }

  ngOnInit(): void {
  }

}

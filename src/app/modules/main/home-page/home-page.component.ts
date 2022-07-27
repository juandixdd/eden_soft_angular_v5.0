import { Component, OnInit } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  private _unsubscribeAll: Subject<any>;
  constructor(
    private _coreConfigService: CoreConfigService,
  ) {
    
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: false
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: false
        },
        customizer: true,
        enableLocalStorage: true
      }
    };
   }

  ngOnInit(): void {
  }

}

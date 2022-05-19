import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { MainRoutingModule } from './main-routing.module';
import { ClientsListPageComponent } from './pages/clients/clients-list-page/clients-list-page.component';
import { ClientsAddPageComponent } from './pages/clients/clients-add-page/clients-add-page.component';

import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CotizacionComponent } from './ventas/cotizacion/cotizacion.component';
import { AccesoComponent } from './usuarios/acceso/acceso.component';


@NgModule({
  declarations: [
        ClientsListPageComponent,
    ClientsAddPageComponent,
    CotizacionComponent,
    AccesoComponent,
  ],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    RouterModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    SharedModule,
    NgxDatatableModule,
    MainRoutingModule
  ]
})
export class MainModule { }

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
import { RolesComponent } from './configuracion/roles/roles.component';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './usuarios/login/login.component';
import { RestaurarClaveComponent } from './usuarios/restaurar-clave/restaurar-clave.component';
import { ClienteComponent } from './ventas/cliente/cliente.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { LandingComponent } from './landing/landing.component';
import { LandingHeaderComponent } from './landing/landing-header/landing-header.component';
import { BreadcrumbModule } from 'app/layout/components/content-header/breadcrumb/breadcrumb.module';
import { ProduccionTableComponent } from './dashboard/produccion-table/produccion-table.component';
import { TopTableComponent } from './dashboard/top-table/top-table.component';
import { VentasTableComponent } from './dashboard/ventas-table/ventas-table.component';
import { RegistroUsuariosComponent } from './usuarios/registro-usuarios/registro-usuarios.component';
import { LanginFooterComponent } from './landing/langin-footer/langin-footer.component';
import { ProduccionComponent } from './produccion/produccion.component';
import { CategoriasComponent } from './produccion/categorias/categorias.component';
import { ProductosComponent } from './produccion/productos/productos.component';
import { OrdenDeProduccionComponent } from './produccion/orden-de-produccion/orden-de-produccion.component';
import { VentasComponent } from './ventas/ventas/ventas.component';
import { PedidosComponent } from './ventas/pedidos/pedidos.component';


@NgModule({
  declarations: [
        ClientsListPageComponent,
    ClientsAddPageComponent,
    CotizacionComponent,
    AccesoComponent,
    RolesComponent,
    ListaUsuariosComponent,
    DashboardComponent,
    LoginComponent,
    RestaurarClaveComponent,
    ClienteComponent,
    LandingComponent,
    LandingHeaderComponent,
    ProduccionTableComponent,
    TopTableComponent,
    VentasTableComponent,
    RegistroUsuariosComponent,
    LanginFooterComponent,
    ProduccionComponent,
    CategoriasComponent,
    ProductosComponent,
    OrdenDeProduccionComponent,
    VentasComponent,
    PedidosComponent,
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
    MainRoutingModule,
    CoreTouchspinModule,
    NgApexchartsModule,
    Ng2FlatpickrModule,
    BreadcrumbModule

  ]
})
export class MainModule { }

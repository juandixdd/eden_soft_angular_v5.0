import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { MainRoutingModule } from './main-routing.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RolesComponent } from './configuracion/roles/roles.component';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { ListaUsuariosComponent } from './usuarios/usuarios/lista-usuarios/lista-usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './usuarios/acceso/login/login.component';
import { RestaurarClaveComponent } from './usuarios/acceso/restaurar-clave/restaurar-clave.component';
import { ClienteComponent } from './ventas/cliente/cliente.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { LandingComponent } from './extras/landing/landing.component';
import { LandingHeaderComponent } from './extras/landing/landing-header/landing-header.component';
import { BreadcrumbModule } from 'app/layout/components/content-header/breadcrumb/breadcrumb.module';
import { ProduccionTableComponent } from './dashboard/produccion-table/produccion-table.component';
import { TopTableComponent } from './dashboard/top-table/top-table.component';
import { VentasTableComponent } from './dashboard/ventas-table/ventas-table.component';
import { RegistroUsuariosComponent } from './usuarios/usuarios/registro-usuarios/registro-usuarios.component';
import { LanginFooterComponent } from './extras/landing/langin-footer/langin-footer.component';
import { CategoriasComponent } from './productos/categorias/categorias.component';
import { ProductosComponent } from './productos/productos/productos.component';
import { VentasComponent } from './ventas/ventas/ventas.component';
import { ProductosAdminComponent } from './productos/productos-admin/productos-admin.component';
import { PerfilUsuarioComponent } from './usuarios/usuarios/perfil-usuario/perfil-usuario.component';
import { ContactenosComponent } from './extras/contactenos/contactenos.component';
import { HomePageComponent } from './extras/home-page/home-page.component';
import { LandingProductsComponent } from './extras/landing/landing-products/landing-products.component';
import { PermisosComponent } from './configuracion/permisos/permisos.component';
import { CotizacionComponent } from './pedidos/cotizacion/cotizacion.component';
import { HeaderProductosComponent } from './productos/productos/header-productos/header-productos.component';
import { CreateInformativeClientComponent } from './ventas/ventas/create-informative-client/create-informative-client.component';
import { PedidosComponent } from './pedidos/pedidos/pedidos.component';
import { PagoComponent } from './pedidos/pedidos/pago/pago.component';
import { CotizacionClienteComponent } from './pedidos/cotizacion-cliente/cotizacion-cliente.component';
import { PedidosClienteComponent } from './pedidos/pedidos-cliente/pedidos-cliente.component';
import { PedidosLocalComponent } from './pedidos/pedidos-local/pedidos-local.component';
import { CreateClientComponent } from './pedidos/pedidos-local/create-client/create-client.component';
import { RecuperarClaveComponent } from './usuarios/acceso/recuperar-clave/recuperar-clave.component';


@NgModule({
  declarations: [
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
    CategoriasComponent,
    ProductosComponent,
    VentasComponent,
    ProductosAdminComponent,
    PerfilUsuarioComponent,
    ContactenosComponent,
    HomePageComponent,
    LandingProductsComponent,
    PermisosComponent,
    CotizacionComponent,
    HeaderProductosComponent,
    CreateInformativeClientComponent,
    PedidosComponent,
    PagoComponent,
    CotizacionClienteComponent,
    PedidosClienteComponent,
    PedidosLocalComponent,
    CreateClientComponent,
    RecuperarClaveComponent
  ],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    RouterModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    NgxDatatableModule,
    MainRoutingModule,
    CoreTouchspinModule,
    NgApexchartsModule,
    Ng2FlatpickrModule,
    BreadcrumbModule,

  ]
})
export class MainModule { }

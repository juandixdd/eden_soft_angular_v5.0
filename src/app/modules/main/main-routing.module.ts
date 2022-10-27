import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './configuracion/roles/roles.component';
import { ListaUsuariosComponent } from './usuarios/usuarios/lista-usuarios/lista-usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './usuarios/acceso/login/login.component';
import { RestaurarClaveComponent } from './usuarios/acceso/restaurar-clave/restaurar-clave.component';
import { ClienteComponent } from './ventas/cliente/cliente.component';
import { RegistroUsuariosComponent } from './usuarios/usuarios/registro-usuarios/registro-usuarios.component';
import { CategoriasComponent } from './productos/categorias/categorias.component';
import { ProductosComponent } from './productos/productos/productos.component';
import { VentasComponent } from './ventas/ventas/ventas.component';
import { ProductosAdminComponent } from './productos/productos-admin/productos-admin.component';
import { PerfilUsuarioComponent } from './usuarios/usuarios/perfil-usuario/perfil-usuario.component';
import { ContactenosComponent } from './extras/contactenos/contactenos.component';
import { AuthGuardGuard } from '../guards/auth-guard.guard';
import { HomePageComponent } from './extras/home-page/home-page.component';
import { PermisosComponent } from './configuracion/permisos/permisos.component';
import { CotizacionComponent } from './pedidos/cotizacion/cotizacion.component';
import { CreateInformativeClientComponent } from './ventas/ventas/create-informative-client/create-informative-client.component';
import { PedidosComponent } from './pedidos/pedidos/pedidos.component';
import { PagoComponent } from './pedidos/pedidos/pago/pago.component';
import { CotizacionClienteComponent } from './pedidos/cotizacion-cliente/cotizacion-cliente.component';
import { PedidosLocalComponent } from './pedidos/pedidos-local/pedidos-local.component';
import { CreateClientComponent } from './pedidos/pedidos-local/create-client/create-client.component';

const routes: Routes = [

  /*Ventas*/
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuardGuard] },
  { path: 'ventas', component: VentasComponent, canActivate: [AuthGuardGuard] },
  { path: 'ventas/create-client/:cedula/:exist', component: CreateInformativeClientComponent, canActivate: [AuthGuardGuard] },

  /*Usuarios*/
  { path: 'lista-usuarios', component: ListaUsuariosComponent, canActivate: [AuthGuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'restaurar-clave', component: RestaurarClaveComponent },
  { path: 'registro-usuarios', component: RegistroUsuariosComponent },
  { path: 'perfil-usuario', component: PerfilUsuarioComponent, canActivate: [AuthGuardGuard] },

  /*Productos*/
  { path: 'categorias', component: CategoriasComponent, canActivate: [AuthGuardGuard] },
  { path: 'productos', component: ProductosComponent },
  { path: 'productos-admin', component: ProductosAdminComponent, canActivate: [AuthGuardGuard] },
  /*Dashboard*/
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard] },

  /* Configuracion */
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuardGuard] },
  { path: 'permisos', component: PermisosComponent, canActivate: [AuthGuardGuard] },


  /* Contactenos */
  { path: 'contactenos', component: ContactenosComponent },

  /*Home Page */
  { path: 'home-page', component: HomePageComponent },

  /**pedidos */
  { path: 'cotizacion', component: CotizacionComponent, canActivate: [AuthGuardGuard] },
  { path: 'cotizacion/user', component: CotizacionClienteComponent, canActivate: [AuthGuardGuard] },

  { path: 'pedidos', component: PedidosComponent, canActivate: [AuthGuardGuard]},
  { path: 'pedidos/pago', component: PagoComponent, canActivate: [AuthGuardGuard]},
  { path: 'pedidos-local', component: PedidosLocalComponent, canActivate: [AuthGuardGuard]},
  { path: 'pedidos-local/create-client/:cedula/:exist', component: CreateClientComponent, canActivate: [AuthGuardGuard] },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'app/auth-guard.guard';
import { CotizacionComponent } from './ventas/cotizacion/cotizacion.component';
import { AccesoComponent } from './usuarios/acceso/acceso.component';
import { RolesComponent } from './configuracion/roles/roles.component';
import { ListaUsuariosComponent } from './usuarios/lista-usuarios/lista-usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './usuarios/login/login.component';
import { RestaurarClaveComponent } from './usuarios/restaurar-clave/restaurar-clave.component';
import { ClienteComponent } from './ventas/cliente/cliente.component';
import { RegistroUsuariosComponent } from './usuarios/registro-usuarios/registro-usuarios.component';
import { CategoriasComponent } from './produccion/categorias/categorias.component';
import { ProductosComponent } from './produccion/productos/productos.component';
import { OrdenDeProduccionComponent } from './produccion/orden-de-produccion/orden-de-produccion.component';
import { VentasComponent } from './ventas/ventas/ventas.component';
import { PedidosComponent } from './ventas/pedidos/pedidos.component';
import { ProductosAdminComponent } from './produccion/productos-admin/productos-admin.component';
import { PerfilUsuarioComponent } from './usuarios/perfil-usuario/perfil-usuario.component';
import { ContactenosComponent } from './contactenos/contactenos.component';

const routes: Routes = [

  /*Ventas*/
  { path: 'cotizacion', component: CotizacionComponent},
  { path: 'cliente', component: ClienteComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'pedidos', component: PedidosComponent },


  /*Usuarios*/
  {path: 'recuperar-contraseña',component:AccesoComponent},
  {path:'lista-usuarios', component:ListaUsuariosComponent},
  {path: 'login', component:LoginComponent},
  {path: 'restaurar-clave',component:RestaurarClaveComponent},
  {path: 'registro-usuarios',component:RegistroUsuariosComponent},
  {path: 'perfil-usuario',component:PerfilUsuarioComponent},

  /*Produccion*/
  {path: 'categorias',component:CategoriasComponent},
  {path:'orden-de-produccion', component:OrdenDeProduccionComponent},
  {path:'productos', component:ProductosComponent},
  {path:'productos-admin', component:ProductosAdminComponent},
  /*Dashboard*/
  {path:'dashboard', component:DashboardComponent},

  /* Roles */
  { path: 'roles', component: RolesComponent },

  /* Contactenos */
  { path: 'contactenos', component: ContactenosComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

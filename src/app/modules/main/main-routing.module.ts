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

const routes: Routes = [

  /*Ventas*/
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuardGuard] },
  { path: 'ventas', component: VentasComponent, canActivate: [AuthGuardGuard] },


  /*Usuarios*/
  { path: 'lista-usuarios', component: ListaUsuariosComponent, canActivate: [AuthGuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'restaurar-clave', component: RestaurarClaveComponent },
  { path: 'registro-usuarios', component: RegistroUsuariosComponent },
  { path: 'perfil-usuario', component: PerfilUsuarioComponent, canActivate: [AuthGuardGuard] },

  /*Produccion*/
  { path: 'categorias', component: CategoriasComponent, canActivate: [AuthGuardGuard] },
  { path: 'productos', component: ProductosComponent },
  { path: 'productos-admin', component: ProductosAdminComponent, canActivate: [AuthGuardGuard] },
  /*Dashboard*/
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard] },

  /* Roles */
  { path: 'roles', component: RolesComponent, canActivate: [AuthGuardGuard] },

  /* Contactenos */
  { path: 'contactenos', component: ContactenosComponent },

  /*Home Page */
  { path: 'home-page',component:HomePageComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

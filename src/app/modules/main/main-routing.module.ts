import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsListPageComponent } from './pages/clients/clients-list-page/clients-list-page.component';
import { ClientsAddPageComponent } from './pages/clients/clients-add-page/clients-add-page.component';
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

const routes: Routes = [

   /* clients */
  { path: 'clients', component: ClientsListPageComponent },
  { path: "addclients", component: ClientsAddPageComponent },
  { path: "clients/edit/:id", component: ClientsAddPageComponent },

  /*Ventas*/
  { path: 'cotizacion', component: CotizacionComponent},
  { path: 'cliente', component: ClienteComponent },

  /*Usuarios*/
  {path: 'recuperar-contraseña',component:AccesoComponent},
  {path:'lista-usuarios', component:ListaUsuariosComponent},
  {path: 'login', component:LoginComponent},
  {path: 'restaurar-clave',component:RestaurarClaveComponent},
  {path: 'registro-usuarios',component:RegistroUsuariosComponent},

  /*Dashboard*/
  {path:'dashboard', component:DashboardComponent},

  /* Roles */
  { path: 'roles', component: RolesComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

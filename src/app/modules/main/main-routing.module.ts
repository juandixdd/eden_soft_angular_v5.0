import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsListPageComponent } from './pages/clients/clients-list-page/clients-list-page.component';
import { ClientsAddPageComponent } from './pages/clients/clients-add-page/clients-add-page.component';
import { AuthGuardGuard } from 'app/auth-guard.guard';
import { CotizacionComponent } from './ventas/cotizacion/cotizacion.component';
import { AccesoComponent } from './usuarios/acceso/acceso.component';
import { RolesComponent } from './configuracion/roles/roles.component';

const routes: Routes = [

   /* clients */
  { path: 'clients', component: ClientsListPageComponent },
  { path: "addclients", component: ClientsAddPageComponent },
  { path: "clients/edit/:id", component: ClientsAddPageComponent },

  /*Cotizacion*/
  { path: 'cotizacion', component: CotizacionComponent},

  /*Usuarios*/
  {path: 'login',component:AccesoComponent},

  /* Roles */
  { path: 'roles', component: RolesComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GymsAddPageComponent } from './pages/gyms/gyms-add-page/gyms-add-page.component';
import { GymsListPageComponent } from './pages/gyms/gyms-list-page/gyms-list-page.component';
import { PlaceListPageComponent } from './pages/places/place-list-page/place-list-page.component';
import { PlaceAddPageComponent } from './pages/places/place-add-page/place-add-page.component';
import { MembershipsListPageComponent } from './pages/memberships/memberships-list-page/memberships-list-page.component';
import { MembershipsAddPageComponent } from './pages/memberships/memberships-add-page/memberships-add-page.component';
import { ClientsListPageComponent } from './pages/clients/clients-list-page/clients-list-page.component';
import { ClientsAddPageComponent } from './pages/clients/clients-add-page/clients-add-page.component';

const routes: Routes = [

    /* Gyms */
  { path: 'gyms', component: GymsListPageComponent },
  { path: "addgyms", component: GymsAddPageComponent },
  { path: "gyms/edit/:id", component: GymsAddPageComponent },

  /* Places */
  { path: 'places', component: PlaceListPageComponent },
  { path: "addplaces", component: PlaceAddPageComponent },
  { path: "places/edit/:id", component: PlaceAddPageComponent },

  /* memberships */
  { path: 'memberships', component: MembershipsListPageComponent },
  { path: "addmemberships", component: MembershipsAddPageComponent },
  { path: "memberships/edit/:id", component: MembershipsAddPageComponent },

   /* clients */
  { path: 'clients', component: ClientsListPageComponent },
  { path: "addclients", component: ClientsAddPageComponent },
  { path: "clients/edit/:id", component: ClientsAddPageComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

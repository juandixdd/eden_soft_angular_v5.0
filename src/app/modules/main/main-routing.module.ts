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
import { UsersListPageComponent } from './pages/users/users-list-page/users-list-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuardGuard } from 'app/auth-guard.guard';

const routes: Routes = [

    /* Gyms */
  { path: 'gyms', component: GymsListPageComponent, canActivate: [AuthGuardGuard] },
  { path: "addgyms", component: GymsAddPageComponent, canActivate: [AuthGuardGuard] },
  { path: "gyms/edit/:id", component: GymsAddPageComponent , canActivate: [AuthGuardGuard]},

  /* Places */
  { path: 'places', component: PlaceListPageComponent, canActivate: [AuthGuardGuard] },
  { path: "addplaces", component: PlaceAddPageComponent, canActivate: [AuthGuardGuard] },
  { path: "places/edit/:id", component: PlaceAddPageComponent, canActivate: [AuthGuardGuard] },

  /* memberships */
  { path: 'memberships', component: MembershipsListPageComponent, canActivate: [AuthGuardGuard] },
  { path: "addmemberships", component: MembershipsAddPageComponent , canActivate: [AuthGuardGuard]},
  { path: "memberships/edit/:id", component: MembershipsAddPageComponent, canActivate: [AuthGuardGuard] },

   /* clients */
  { path: 'clients', component: ClientsListPageComponent , canActivate: [AuthGuardGuard]},
  { path: "addclients", component: ClientsAddPageComponent , canActivate: [AuthGuardGuard]},
  { path: "clients/edit/:id", component: ClientsAddPageComponent , canActivate: [AuthGuardGuard]},

  /* users */
  { path: 'users', component: UsersListPageComponent , canActivate: [AuthGuardGuard]},

  /* Profile */
  { path: 'profile', component: ProfileComponent , canActivate: [AuthGuardGuard]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

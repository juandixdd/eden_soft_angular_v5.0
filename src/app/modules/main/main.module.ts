import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'; 

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { MainRoutingModule } from './main-routing.module';
import { GymsAddPageComponent } from './pages/gyms/gyms-add-page/gyms-add-page.component';
import { GymsListPageComponent } from './pages/gyms/gyms-list-page/gyms-list-page.component';
import { MembershipsAddPageComponent } from './pages/memberships/memberships-add-page/memberships-add-page.component';
import { MembershipsListPageComponent } from './pages/memberships/memberships-list-page/memberships-list-page.component';
import { ClientsListPageComponent } from './pages/clients/clients-list-page/clients-list-page.component';
import { ClientsAddPageComponent } from './pages/clients/clients-add-page/clients-add-page.component';
import { PlaceAddPageComponent } from './pages/places/place-add-page/place-add-page.component';
import { PlaceListPageComponent } from './pages/places/place-list-page/place-list-page.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UsersListPageComponent } from './pages/users/users-list-page/users-list-page.component';
import { ProfileComponent } from './pages/profile/profile.component';


@NgModule({
  declarations: [
    
    GymsAddPageComponent,
    GymsListPageComponent,
    MembershipsAddPageComponent,
    MembershipsListPageComponent,
    ClientsListPageComponent,
    ClientsAddPageComponent,
    PlaceAddPageComponent,
    PlaceListPageComponent,
    UsersListPageComponent,
    ProfileComponent
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

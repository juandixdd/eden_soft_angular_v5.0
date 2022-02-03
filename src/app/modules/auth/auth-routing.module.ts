import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AuthChangePasswordPageComponent } from './pages/auth-change-password-page/auth-change-password-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent
  },
  {
    path: 'change-password',
    component: AuthChangePasswordPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

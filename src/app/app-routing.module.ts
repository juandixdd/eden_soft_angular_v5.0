import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '', //TODO: localhost:4200/
    loadChildren:() => import(`./modules/main/main.module`).then( m => m.MainModule)
  },
  /* import(`./modules/auth/auth.module`).then( m => m.AuthModule) */
  {
    path: 'main', //TODO: localhost:4200/
    loadChildren:() => import(`./modules/main/main.module`).then( m => m.MainModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled', // Add options right here
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

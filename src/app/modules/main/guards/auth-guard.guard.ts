import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  redirect(flag: any): any {
    if (!flag) {
      this.router.navigate(['/main/login']);
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Opps! debes iniciar sesión',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const accessToken = localStorage.getItem('token');
    this.redirect(accessToken);
    return true;
  }

}

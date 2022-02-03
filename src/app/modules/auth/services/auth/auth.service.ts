import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../../../core/models/user';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URI = environment.API_URI;

  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private http: HttpClient) { }




/*   login(user: User): Observable<JwtResponseI> {
    return this.http.post<JwtResponseI>(`${this.API_URI}/login`, user).pipe(
      tap(
        (res: JwtResponseI) => {
          if (res) {
            // guardar token
           
          }
        }
      )
    );
  } */
  login(user: User) {
    try {
      return this.http.post(`${this.API_URI}/auth/login`, user);
    } catch (error) {
      console.log('error de credenciales');
    }
  }
}

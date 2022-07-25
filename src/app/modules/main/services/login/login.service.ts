import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  login(users) {
    return this.http.post(`${this.API_URL}/auth/login`, users);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolPermisoService {

  API_URL = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }

  createData(body) {
    return this.http.post(`${this.API_URL}/rol-permisos`,body);
  }
}

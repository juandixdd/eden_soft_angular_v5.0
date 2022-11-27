import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.API_URL}/roles`);
  }
  getDataById(id) {
    return this.http.get(`${this.API_URL}/roles/${id}`);
  }

  createData(body) {
    return this.http.post(`${this.API_URL}/roles`,body);
  }

  anularRol(id, body){
    return this.http.put(`${this.API_URL}/anula-rol/${id}`,body)
  }

  getUserWithRol(id) {
    return this.http.get(`${this.API_URL}/usuarios-rol/${id}`);
  }

  getAllRolDataById(id){
    return this.http.get(`${this.API_URL}/roles/permisos/${id}`);
  }
}

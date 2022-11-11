import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.API_URL}/usuario`);
  }

  getDataById(id: number) {
    return this.http.get(`${this.API_URL}/usuario/${id}`);
  }

  editData(id: number, data: any) {
    return this.http.put(`${this.API_URL}/usuario/${id}`, data);
  }

  editProfile(id: number, data: any) {
    return this.http.put(`${this.API_URL}/editProfile/${id}`, data)
  }

  getDataByEmail(email: string) {
    return this.http.get(`${this.API_URL}/usuario/email/${email}`);
  }
}

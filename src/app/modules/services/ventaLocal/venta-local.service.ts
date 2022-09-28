import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaLocalService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.API_URL}/venta-local`)
  }

  createData(data) {
    return this.http.post(`${this.API_URL}/venta-local`, data)
  }

  getAllDetalleVentaData(id) {
    return this.http.get(`${this.API_URL}/venta-local-all-data/${id}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }


  getTopVentas() {
    return this.http.get(`${this.API_URL}/top-productos-ventas`);
  }

  getTopPedidos() {
    return this.http.get(`${this.API_URL}/top-productos-pedidos`);
  }
}

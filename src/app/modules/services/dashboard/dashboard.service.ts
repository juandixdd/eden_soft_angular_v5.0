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

  getTopPedidosLocales(){
    return this.http.get(`${this.API_URL}/top-productos-pedidos-locales`)
  }

  getTopPedidosMEs(body){
    return this.http.post(`${this.API_URL}/top3-pedidos`,body)
  }

  getTopPedidosLocalesMEs(body){
    return this.http.post(`${this.API_URL}/top3-pedidos-locales`,body)
  }
  getTopVentasMEs(body){
    return this.http.post(`${this.API_URL}/top3-ventas-locales`,body)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }


  

  //------------------ Servicios de la tabla Top3--------------------\\

  getTopPedidosMEs(body){
    return this.http.post(`${this.API_URL}/top3-pedidos`,body)
  }

  getTopPedidosLocalesMEs(body){
    return this.http.post(`${this.API_URL}/top3-pedidos-locales`,body)
  }
  getTopVentasMEs(body){
    return this.http.post(`${this.API_URL}/top3-ventas-locales`,body)
  }

   //------------------ Servicios de la tabla Ventas--------------------\\

   getVentasPedidos(body){
    return this.http.post(`${this.API_URL}/totales-pedidos`,body)
  }

  getVentasPedidosLocales(body){
    return this.http.post(`${this.API_URL}/totales-pedidos-locales`,body)
  }

  getVentas(body){
    return this.http.post(`${this.API_URL}/totales-ventas`,body)
  }
}

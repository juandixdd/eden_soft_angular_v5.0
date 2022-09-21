import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PedidosService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  //? servicios del pedido
  getData() {
    return this.http.get(`${this.API_URL}/pedidos`)
  }

  getDataById(id) {
    return this.http.get(`${this.API_URL}/pedidos/${id}`);
  }

  createPedido(product: any) {
    return this.http.post(`${this.API_URL}/pedidos`, product)
  }

  //? servicios del detalle del pedido
  getDetalles() {
    return this.http.get(`${this.API_URL}/detalle-pedido`)
  }

  getDetalleById(id) {
    return this.http.get(`${this.API_URL}/detalle-pedido/${id}`);
  }

  createDetalle(product: any) {
    return this.http.post(`${this.API_URL}/detalle-pedido`, product)
  }

  //? cotizaciones 
  getCotizaciones(){
    return this.http.get(`${this.API_URL}/cotizaciones`)
  }

  getCotizacionesById(id){
    return this.http.get(`${this.API_URL}/cotizaciones/${id}`);
  }
}


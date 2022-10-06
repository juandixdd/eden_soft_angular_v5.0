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

  getPedidoByCedula(cedula: any){
    return this.http.get(`${this.API_URL}/pedidos/cliente/${cedula}`)
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

  getCotizacionesByUserId(id){
    return this.http.get(`${this.API_URL}/cotizaciones/usuario/${id}`);
    //? traer cotizacionesbyuserid 
  }
  
  getCotizacionesById(id){
    return this.http.get(`${this.API_URL}/cotizaciones/${id}`);
    //? traer cotizacionesbyid con los productos
  }

  getCotizacionesByIdInfo(id){
    return this.http.get(`${this.API_URL}/cotizaciones/info/${id}`);
    //? traer cotizaciones con la info del usuario
  }

  anularCotizacion(id, body){
    return this.http.put(`${this.API_URL}/cotizaciones/anular/${id}`, body);
    //? anular cotizaciones 
  }

}


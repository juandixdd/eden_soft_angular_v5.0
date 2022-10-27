import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoLocalService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(`${this.API_URL}/pedido-local`)
  }

  createData(data) {
    return this.http.post(`${this.API_URL}/pedido-local`, data)
  }

  getAllDetallePedidoData(id) {
    return this.http.get(`${this.API_URL}/pedido-local-all/${id}`)
  }

  anularPedidoLocal(id, data) {
    return this.http.put(`${this.API_URL}/pedido-local/${id}`, data)
  }
}

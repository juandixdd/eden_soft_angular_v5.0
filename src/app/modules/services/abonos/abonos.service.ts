import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AbonosService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.API_URL}/abonos`)
  }

  createData(data) {
    return this.http.post(`${this.API_URL}/abonos`, data)
  }

  createDataPedido(data) {
    return this.http.post(`${this.API_URL}/abonos/pedido`, data)
  }
}

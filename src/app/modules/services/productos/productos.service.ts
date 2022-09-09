import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.API_URL}/productos`)
  }

  getDataById(id) {
    return this.http.get(`${this.API_URL}/productos/${id}`);
  }

  createProduct(product: any) {
    return this.http.post(`${this.API_URL}/productos`, product)
  }

  getProductInObject(id) {
    return this.http.get(`${this.API_URL}/productos/object/${id}`)
  }
}

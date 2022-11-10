import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesInformativosService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.API_URL}/clientes-informativos`)
  }

  getDataById(id:number){
    return this.http.get(`${this.API_URL}/clientes-informativos/${id}`)
  }

  createData(client: any){
    return this.http.post(`${this.API_URL}/clientes-informativos`, client)
  }

  createCliente(cliente: any) {
    return this.http.post(`${this.API_URL}/clientes-informativos`, cliente)
  }

  updateCliente(id:number,row){
    return this.http.put(`${this.API_URL}/clientes-informativos/${id}`,row)
  }
  
  anularUsuario(id, body){
    return this.http.put(`${this.API_URL}/anula-usuario/${id}`,body)
  }


}

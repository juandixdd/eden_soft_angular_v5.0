import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class PermisosService {
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  //* Funciones

  getData() {
    return this.http.get(`${this.API_URL}/permisos`);
  }
  getDataById(id:number){
    return this.http.get(`${this.API_URL}/permisos/${id}`)
  }
  createData(body) {
    return this.http.post(`${this.API_URL}/permisos`,body);
  }

  updateData(id:number,body:any){
    return this.http.put(`${this.API_URL}/permisos/${id}`,body)
  }

  deleteData(id:number){
    return this.http.delete(`${this.API_URL}/permisos/${id}`)
}


}

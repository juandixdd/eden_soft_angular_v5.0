import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }


  getData(){
    return this.http.get(`${this.API_URL}/categoria`)
  }

  getDataById(id){
    return this.http.get(`${this.API_URL}/categoria/${id}`);
  }

  createData(body){
    return this.http.post(`${this.API_URL}/categoria`, body)
  }

  updateData(id:number,body:any){
    return this.http.put(`${this.API_URL}/categoria/${id}`,body)
  }

  deleteData(id:number){
    return this.http.delete(`${this.API_URL}/categoria/${id}`)

}
}

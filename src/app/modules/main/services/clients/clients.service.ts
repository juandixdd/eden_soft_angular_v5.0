import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from '../../../../core/models/client';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private readonly API_URI = environment.API_URI;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.API_URI}/clients`);
  }

  getClient(id: number) {
    return this.http.get(`${this.API_URI}/clients/${id}`);
  }

  addClient(client) {
    return this.http.post(`${this.API_URI}/clients`, client);
  }

  updateClient(id: number, updatedclient: Client): Observable<Client> {
    return this.http.put(`${this.API_URI}/clients/${id}`, updatedclient);
  }

  deleteClient(id: number) {
    return this.http.delete(`${this.API_URI}/clients/${id}`);
  }
}


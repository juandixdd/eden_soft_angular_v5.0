import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  //* Funciones

  getData() {
    return this.http.get(`${this.API_URL}/users`);
  }

  getDataById(id: number) {
    return this.http.get(`${this.API_URL}/users/${id}`);
  }

  createUser(users) {
    return this.http.post(`${this.API_URL}/users`, users);
  }

  updateUser(id: number, user) {
    return this.http.put(`${this.API_URL}/users/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.API_URL}/users/${id}`);
  }
}


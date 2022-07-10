import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  
  API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.API_URL}/users`);
  }
  createUser(users){
    return this.http.post(`${this.API_URL}/users`, users);
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  
  api_url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.api_url}/users`);
  }
  createUser(users){
    return this.http.post(`${this.api_url}/users`, users);
  }
}


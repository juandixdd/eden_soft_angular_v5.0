import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly API_URI = environment.API_URI;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.API_URI}/users`);
  }

  getUser(id: number) {
    return this.http.get(`${this.API_URI}/users/${id}`);
  }

  addUser(user) {
    return this.http.post(`${this.API_URI}/users`, user);
  }

  updateUser(id: number, updatedUser: User): Observable<User> {
    return this.http.put(`${this.API_URI}/users/${id}`, updatedUser);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.API_URI}/users/${id}`);
  }
}

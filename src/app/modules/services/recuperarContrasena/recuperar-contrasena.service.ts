import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecuperarContrasenaService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) { }

  sendEmail(body) {
    return this.http.post(`${this.API_URL}/send-mail`, body);
  }
  
}

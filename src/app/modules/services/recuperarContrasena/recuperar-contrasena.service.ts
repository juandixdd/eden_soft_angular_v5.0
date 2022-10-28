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

  validateEmail(correo) {
    return this.http.get(`${this.API_URL}/buscar-correo/${correo}`)
  }

  verificarToken(token) {
    return this.http.post(`${this.API_URL}/verificar-token`, token);
  }

  cambiarClave(id, body) {
    return this.http.put(`${this.API_URL}/editar-clave/${id}`, body)
  }

}

import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { place } from 'app/core/models/place';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private readonly API_URI = environment.API_URI;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.API_URI}/places`);
  }

  getDataByGym(id: any) {
    return this.http.get(`${this.API_URI}/places/byGyms/${id}`);
  }

  getPlace(id: number) {
    return this.http.get(`${this.API_URI}/places/${id}`);
  }

  addPlace(gym: place) {
    return this.http.post(`${this.API_URI}/places`, gym);
  }

  updatePlace(id: number, updatedPlace: place): Observable<place> {
    return this.http.put(`${this.API_URI}/places/${id}`, updatedPlace);
  }

  deletePlace(id: number) {
    return this.http.delete(`${this.API_URI}/places/${id}`);
  }
}

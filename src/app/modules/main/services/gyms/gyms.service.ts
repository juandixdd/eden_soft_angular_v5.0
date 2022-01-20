import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { gym } from '../../../../core/models/gym';


@Injectable({
  providedIn: "root",
})
export class GymsService {

  private readonly API_URI = environment.API_URI;

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(`${this.API_URI}/gyms`);
  }

  getGym(id: number) {
    return this.http.get(`${this.API_URI}/gyms/${id}`);
  }

  addGym(gym) {
    return this.http.post(`${this.API_URI}/gyms`, gym);
  }

  updateGym(id: number, updatedgym: gym): Observable<gym> {
    return this.http.put(`${this.API_URI}/gyms/${id}`, updatedgym);
  }

  deleteGym(id: number) {
    return this.http.delete(`${this.API_URI}/gyms/${id}`);
  }
}

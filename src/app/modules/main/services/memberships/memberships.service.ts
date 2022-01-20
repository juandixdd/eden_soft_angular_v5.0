import { environment } from '../../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Membership } from '../../../../core/models/membership';

@Injectable({
  providedIn: 'root'
})
export class MembershipsService {

  private readonly API_URI = environment.API_URI;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.API_URI}/memberships`);
  }

  getMembership(id: number) {
    return this.http.get(`${this.API_URI}/memberships/${id}`);
  }

  addMembership(membership) {
    return this.http.post(`${this.API_URI}/memberships`, membership);
  }

  updateMembership(id: number, updatedmembership: Membership): Observable<Membership> {
    return this.http.put(`${this.API_URI}/memberships/${id}`, updatedmembership);
  }

  deleteMembership(id: number) {
    return this.http.delete(`${this.API_URI}/memberships/${id}`);
  }
}


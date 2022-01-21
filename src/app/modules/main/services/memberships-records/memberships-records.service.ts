import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MembershipRecord } from '../../../../core/models/membership-record';



@Injectable({
  providedIn: 'root'
})
export class MembershipsRecordsService {

  private readonly API_URI = environment.API_URI;

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.API_URI}/memberships-record`);
  }

  getMembershipRecord(id: number) {
    return this.http.get(`${this.API_URI}/clients/memberships/${id}`);
  }

  getMembershipRecordByClientId(id: number) {
    return this.http.get(`${this.API_URI}/clients/memberships/${id}`);
  }

  addMembershipRecord(membershipRecord) {
    return this.http.post(`${this.API_URI}/memberships-record`, membershipRecord);
  }

  updateMembershipRecord(id: number, updatedmembershipRecord: MembershipRecord): Observable<MembershipRecord> {
    return this.http.put(`${this.API_URI}/memberships-record/${id}`, updatedmembershipRecord);
  }

  deleteMembershipRecord(id: number) {
    return this.http.delete(`${this.API_URI}/memberships-record/${id}`);
  }
}


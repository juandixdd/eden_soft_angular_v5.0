import { TestBed } from '@angular/core/testing';

import { MembershipsRecordsService } from './memberships-records.service';

describe('MembershipsRecordsService', () => {
  let service: MembershipsRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembershipsRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { VentaLocalService } from './venta-local.service';

describe('VentaLocalService', () => {
  let service: VentaLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentaLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

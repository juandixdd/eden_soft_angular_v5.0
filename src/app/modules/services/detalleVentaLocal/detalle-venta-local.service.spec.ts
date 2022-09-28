import { TestBed } from '@angular/core/testing';

import { DetalleVentaLocalService } from './detalle-venta-local.service';

describe('DetalleVentaLocalService', () => {
  let service: DetalleVentaLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleVentaLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

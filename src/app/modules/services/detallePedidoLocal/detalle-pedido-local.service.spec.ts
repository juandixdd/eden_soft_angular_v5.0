import { TestBed } from '@angular/core/testing';

import { DetallePedidoLocalService } from './detalle-pedido-local.service';

describe('DetallePedidoLocalService', () => {
  let service: DetallePedidoLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallePedidoLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

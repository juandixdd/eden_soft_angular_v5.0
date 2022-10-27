import { TestBed } from '@angular/core/testing';

import { PedidoLocalService } from './pedido-local.service';

describe('PedidoLocalService', () => {
  let service: PedidoLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

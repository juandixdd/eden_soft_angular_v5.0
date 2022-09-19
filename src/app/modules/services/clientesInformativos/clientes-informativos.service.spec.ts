import { TestBed } from '@angular/core/testing';

import { ClientesInformativosService } from './clientes-informativos.service';

describe('ClientesInformativosService', () => {
  let service: ClientesInformativosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesInformativosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

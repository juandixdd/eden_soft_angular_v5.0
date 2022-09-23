import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionClienteComponent } from './cotizacion-cliente.component';

describe('CotizacionClienteComponent', () => {
  let component: CotizacionClienteComponent;
  let fixture: ComponentFixture<CotizacionClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizacionClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

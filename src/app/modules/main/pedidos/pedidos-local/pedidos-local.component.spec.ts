import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosLocalComponent } from './pedidos-local.component';

describe('PedidosLocalComponent', () => {
  let component: PedidosLocalComponent;
  let fixture: ComponentFixture<PedidosLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosLocalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

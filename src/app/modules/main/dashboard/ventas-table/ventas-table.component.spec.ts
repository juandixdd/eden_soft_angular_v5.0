import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasTableComponent } from './ventas-table.component';

describe('VentasTableComponent', () => {
  let component: VentasTableComponent;
  let fixture: ComponentFixture<VentasTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

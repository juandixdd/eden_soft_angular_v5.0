import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDeProduccionComponent } from './orden-de-produccion.component';

describe('OrdenDeProduccionComponent', () => {
  let component: OrdenDeProduccionComponent;
  let fixture: ComponentFixture<OrdenDeProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenDeProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDeProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

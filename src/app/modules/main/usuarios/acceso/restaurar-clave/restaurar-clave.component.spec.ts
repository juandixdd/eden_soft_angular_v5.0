import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurarClaveComponent } from './restaurar-clave.component';

describe('RestaurarClaveComponent', () => {
  let component: RestaurarClaveComponent;
  let fixture: ComponentFixture<RestaurarClaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurarClaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurarClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

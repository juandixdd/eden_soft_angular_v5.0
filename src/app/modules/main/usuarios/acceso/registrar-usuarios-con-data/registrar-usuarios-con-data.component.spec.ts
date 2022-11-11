import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarUsuariosConDataComponent } from './registrar-usuarios-con-data.component';

describe('RegistrarUsuariosConDataComponent', () => {
  let component: RegistrarUsuariosConDataComponent;
  let fixture: ComponentFixture<RegistrarUsuariosConDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarUsuariosConDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarUsuariosConDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

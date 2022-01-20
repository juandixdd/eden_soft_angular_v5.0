import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsAddPageComponent } from './clients-add-page.component';

describe('ClientsAddPageComponent', () => {
  let component: ClientsAddPageComponent;
  let fixture: ComponentFixture<ClientsAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsAddPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

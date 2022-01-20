import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymsAddPageComponent } from './gyms-add-page.component';

describe('GymsAddPageComponent', () => {
  let component: GymsAddPageComponent;
  let fixture: ComponentFixture<GymsAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymsAddPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GymsAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

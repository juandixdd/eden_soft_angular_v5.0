import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymsListPageComponent } from './gyms-list-page.component';

describe('GymsListPageComponent', () => {
  let component: GymsListPageComponent;
  let fixture: ComponentFixture<GymsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymsListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GymsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

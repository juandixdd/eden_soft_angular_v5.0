import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceAddPageComponent } from './place-add-page.component';

describe('PlaceAddPageComponent', () => {
  let component: PlaceAddPageComponent;
  let fixture: ComponentFixture<PlaceAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceAddPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceListPageComponent } from './place-list-page.component';

describe('PlaceListPageComponent', () => {
  let component: PlaceListPageComponent;
  let fixture: ComponentFixture<PlaceListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanginFooterComponent } from './langin-footer.component';

describe('LanginFooterComponent', () => {
  let component: LanginFooterComponent;
  let fixture: ComponentFixture<LanginFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanginFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanginFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

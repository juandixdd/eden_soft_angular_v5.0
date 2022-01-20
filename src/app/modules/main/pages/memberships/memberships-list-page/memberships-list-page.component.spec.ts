import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipsListPageComponent } from './memberships-list-page.component';

describe('MembershipsListPageComponent', () => {
  let component: MembershipsListPageComponent;
  let fixture: ComponentFixture<MembershipsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipsListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

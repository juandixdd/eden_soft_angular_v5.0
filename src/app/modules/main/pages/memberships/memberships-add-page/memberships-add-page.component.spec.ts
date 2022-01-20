import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipsAddPageComponent } from './memberships-add-page.component';

describe('MembershipsAddPageComponent', () => {
  let component: MembershipsAddPageComponent;
  let fixture: ComponentFixture<MembershipsAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipsAddPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipsAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

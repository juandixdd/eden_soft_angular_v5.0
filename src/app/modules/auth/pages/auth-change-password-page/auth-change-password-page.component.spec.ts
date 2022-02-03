import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthChangePasswordPageComponent } from './auth-change-password-page.component';

describe('AuthChangePasswordPageComponent', () => {
  let component: AuthChangePasswordPageComponent;
  let fixture: ComponentFixture<AuthChangePasswordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthChangePasswordPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthChangePasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInformativeClientComponent } from './create-informative-client.component';

describe('CreateInformativeClientComponent', () => {
  let component: CreateInformativeClientComponent;
  let fixture: ComponentFixture<CreateInformativeClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInformativeClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInformativeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

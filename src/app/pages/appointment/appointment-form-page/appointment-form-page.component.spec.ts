import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentFormPageComponent } from './appointment-form-page.component';

describe('AppointmentFormPageComponent', () => {
  let component: AppointmentFormPageComponent;
  let fixture: ComponentFixture<AppointmentFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

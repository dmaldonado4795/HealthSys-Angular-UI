import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFormPageComponent } from './patient-form-page.component';

describe('PatientFormPageComponent', () => {
  let component: PatientFormPageComponent;
  let fixture: ComponentFixture<PatientFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

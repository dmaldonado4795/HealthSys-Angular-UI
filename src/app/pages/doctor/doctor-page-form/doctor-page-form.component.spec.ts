import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPageFormComponent } from './doctor-page-form.component';

describe('DoctorPageFormComponent', () => {
  let component: DoctorPageFormComponent;
  let fixture: ComponentFixture<DoctorPageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorPageFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

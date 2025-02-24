import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryFormPageComponent } from './medical-history-form-page.component';

describe('MedicalHistoryFormPageComponent', () => {
  let component: MedicalHistoryFormPageComponent;
  let fixture: ComponentFixture<MedicalHistoryFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalHistoryFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

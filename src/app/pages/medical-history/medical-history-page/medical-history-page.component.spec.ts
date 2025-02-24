import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryPageComponent } from './medical-history-page.component';

describe('MedicalHistoryPageComponent', () => {
  let component: MedicalHistoryPageComponent;
  let fixture: ComponentFixture<MedicalHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalHistoryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

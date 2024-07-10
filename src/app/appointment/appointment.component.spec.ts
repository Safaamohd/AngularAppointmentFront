import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentComponent } from './appointment.component';
import { By } from '@angular/platform-browser';

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let fixture: ComponentFixture<AppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default selected availability of availableTomorrow', () => {
    expect(component.selectedAvailability).toBe('availableTomorrow');
  });

  it('should have a default selected specialist of cardiologist', () => {
    expect(component.selectedSpecialist).toBe('cardiologist');
  });

  it('should display the correct number of doctors', () => {
    const doctorCards = fixture.debugElement.queryAll(By.css('.appointment-card'));
    expect(doctorCards.length).toBe(2); 
  });
});

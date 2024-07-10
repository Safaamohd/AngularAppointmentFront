import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorComponent } from './doctor.component';

describe('DoctorComponent', () => {
  let component: DoctorComponent;
  let fixture: ComponentFixture<DoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorComponent);
    component = fixture.componentInstance;
    // Simulate input data for testing
    // component.doctor = {
    //   name: 'Dr. Maryam Daud Abdi',
    //   specialization: 'MBBS, Cardiology - 6 Years of Experience',
    //   location: 'Tawakal, Zanzibar',
    //   rating: 4.5,
    //   imgSrc: 'assets/D1a.png'
    // };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

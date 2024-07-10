import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PatientComponent } from './patient.component';

describe('PatientComponent', () => {
  let component: PatientComponent;
  let fixture: ComponentFixture<PatientComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientComponent],
      imports: [FormsModule, HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the patient component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch patients on initialization', () => {
    const mockPatients = [
      { serialNo: 1, doctorName: 'Dr. Smith', doctorMobileNo: '1234567890', doctorEmail: 'smith@example.com' },
      { serialNo: 2, doctorName: 'Dr. Johnson', doctorMobileNo: '0987654321', doctorEmail: 'johnson@example.com' },
    ];

    component.ngOnInit();
    const req = httpMock.expectOne(`http://localhost:8081/add/patient/${localStorage.getItem('id')}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPatients);

    expect(component.patients.length).toBe(2);
    expect(component.filteredPatients.length).toBe(2);
  });

  it('should filter patients based on search query', () => {
    component.patients = [
      { serialNo: 1, doctorName: 'Dr. Smith', doctorMobileNo: '1234567890', doctorEmail: 'smith@example.com' },
      { serialNo: 2, doctorName: 'Dr. Johnson', doctorMobileNo: '0987654321', doctorEmail: 'johnson@example.com' },
      { serialNo: 3, doctorName: 'Dr. Brown', doctorMobileNo: '1112223333', doctorEmail: 'brown@example.com' },
    ];
    component.filteredPatients = [...component.patients];

    component.searchQuery = 'Smith';
    component.onSearchQueryChange();
    expect(component.filteredPatients.length).toBe(1);

    component.searchQuery = 'johnson';
    component.onSearchQueryChange();
    expect(component.filteredPatients.length).toBe(1);

    component.searchQuery = 'example.com';
    component.onSearchQueryChange();
    expect(component.filteredPatients.length).toBe(3);
  });

  it('should limit patients based on records per page', () => {
    component.patients = [
      { serialNo: 1, doctorName: 'Dr. Smith', doctorMobileNo: '1234567890', doctorEmail: 'smith@example.com' },
      { serialNo: 2, doctorName: 'Dr. Johnson', doctorMobileNo: '0987654321', doctorEmail: 'johnson@example.com' },
      { serialNo: 3, doctorName: 'Dr. Brown', doctorMobileNo: '1112223333', doctorEmail: 'brown@example.com' },
    ];
    component.filteredPatients = [...component.patients];

    component.recordsPerPage = 2;
    component.onSearchQueryChange();
    expect(component.filteredPatients.length).toBe(2);
  });

  it('should delete patient', () => {
    component.patients = [
      { serialNo: 1, doctorName: 'Dr. Smith', doctorMobileNo: '1234567890', doctorEmail: 'smith@example.com' },
      { serialNo: 2, doctorName: 'Dr. Johnson', doctorMobileNo: '0987654321', doctorEmail: 'johnson@example.com' },
    ];
    component.filteredPatients = [...component.patients];

    const patientToDelete = component.patients[0];
    spyOn(window, 'confirm').and.returnValue(true);  // Mock the confirm dialog

    component.deletePatient(patientToDelete);
    expect(component.patients.length).toBe(1);
    expect(component.filteredPatients.length).toBe(1);
    expect(component.patients.find(p => p.serialNo === patientToDelete.serialNo)).toBeUndefined();
  });
});

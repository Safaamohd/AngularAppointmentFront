import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service'

export interface Appointment {
  appointmentId: number;
}

export interface Doctor {
  id: number;
  doctorName: string;
  department: Department;
  experience: string;
  location: string;
  rating: string;
  schedule: string;
  cost: string;
  doctorEmail: string;
  doctorMobileNo: string;
  imageUrl: string;
}

export interface Patient {
  patientId: number;
}

export interface Department {
  departmentName: string;
}

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  private baseUrl = 'http://localhost:8081';
  appointment: any[] = [];
  doctors: Doctor[] = [];
  patient: Patient[] = [];
  departments: Department[] = [];
  filteredDoctors: Doctor[] = [];

  constructor(private authService: AuthenticationService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAppointment();
    this.fetchDoctors();
    this.fetchPatients();
    this.fetchDepartments();
  }

  fetchAppointment() {
    this.http.get<Appointment[]>(`${this.baseUrl}/add/addAppointment/`).subscribe(
      (data: any[]) => {
        console.log('Appointment fetched:', data);
        this.appointment = data;
      },
      (error: any) => {
        console.error('Error fetching Appointment:', error);
      }
    );
  }

  fetchDoctors() {
    this.http.get<Doctor[]>(`${this.baseUrl}/api/doctor`).subscribe(
      (data: any[]) => {
        console.log('Doctors fetched:', data);
        this.doctors = data;
        this.filteredDoctors = data; // To show all doctors initially
      },
      (error: any) => {
        console.error('Error fetching Doctors:', error);
      }
    );
  }

  fetchPatients() {
    this.http.get<Patient[]>(`${this.baseUrl}/api/patient/`).subscribe(
      (data: any[]) => {
        console.log('Patients fetched:', data);
        this.patient = data;
      },
      (error: any) => {
        console.error('Error fetching Patients', error);
      }
    );
  }

  fetchDepartments() {
    this.http.get<Department[]>(`${this.baseUrl}/api/department/`).subscribe(
      (data: any[]) => {
        console.log('Departments fetched:', data);
        this.departments = data;
      },
      (error: any) => {
        console.error('Error fetching Departments', error);
      }
    );
  }

  onSpecialistChange(event: Event): void {
    const selectedSpecialist = (event.target as HTMLSelectElement).value;
    this.filteredDoctors = this.doctors.filter(doctor => doctor.department.departmentName === selectedSpecialist);
  }

  bookAppointment(doctorId: number): void {
    const patientId = localStorage.getItem('id');
    if (!patientId) {
      console.error('Patient is not logged in');
      return;
    }
    const appointmentRequest = {
      patientId: Number(patientId),
      doctorId: doctorId
    };

    console.log('Data', appointmentRequest);

    this.authService.addPatientAppointment(appointmentRequest).subscribe(
      () => {
        console.log('Appointment booked successfully!');
      },
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
 

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  public baseUrl = 'http://localhost:8081';
  private isLoggedInStatus = false;

  constructor(private http: HttpClient) {}

  register(patient: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/patient/`, patient, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  loginDoctor(doctor: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/doctor/loginDoctor`, doctor, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      tap(response => {
        if (response.message === 'Login successfully') {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('id', response.id);
          this.isLoggedInStatus = true;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.error.message || 'Login failed'));
      })
    );
  }

  login(patient: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/patient/login`, patient, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      tap(response => {
        if (response.message === 'Login successfully') {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('id', response.id);
          this.isLoggedInStatus = true;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.error.message || 'Login failed'));
      })
    );
  }

  checkSession(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/patient/checkSession`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      tap(response => {
        this.isLoggedInStatus = response.message === 'User is logged in';
      }),
      catchError((error: HttpErrorResponse) => {
        this.isLoggedInStatus = false;
        return throwError(() => new Error(error.error.message || 'Session check failed'));
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

  getCurrentPatient(): Observable<any> {
    const patientId = localStorage.getItem('id');
    return this.http.get<any>(`${this.baseUrl}/api/patient/${patientId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching current patient:', error);
        return throwError(() => new Error(error.message || 'Error fetching current patient!'));
      })
    );
  }

  updatePatient(patient: any): Observable<any> {
    const patientId = localStorage.getItem('id');
    return this.http.put<any>(`${this.baseUrl}/api/patient/${patientId}`, patient, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating patient:', error);
        return throwError(() => new Error(error.message || 'Error updating patient!'));
      })
    );
  }

  addPatientAppointment(appointmentRequest: { patientId: number, doctorId: number }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add/addAppointment/`, appointmentRequest, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error booking appointment:', error);
        return throwError(() => new Error(error.message || 'Error booking appointment!'));
      })
    );
  }
  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.baseUrl}/api/department/`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}/api/doctor`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  addDoctor(newDoctor: Doctor): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/doctor/`, newDoctor, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export interface Department {
  departmentName: string;
  description: string;
  status: number;
}

export interface Doctor {
  id: any;
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

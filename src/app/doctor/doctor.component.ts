import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  id: any;
  doctors: Doctor[] = [];
  doctorName: string = '';
  department: Department = { departmentName: '', description: '', status: 1 };
  doctorEmail: string = '';
  doctorMobileNo: string = '';
  experience: string = '';
  location: string = '';
  rating: string = '';
  schedule: string = '';
  cost: string = '';
  imageUrl: string = '';

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.fetchDoctor();
  }

  fetchDoctor() {
    this.authService.getDoctors().subscribe(
      (doctors: Doctor[]) => {
        this.doctors = doctors;
      },
      (error) => {
        console.error('Error fetching Doctor', error);
      }
    );
  }

  onSubmit(): void {
    if (!this.doctorName || !this.department.departmentName || !this.doctorEmail || !this.doctorMobileNo) {
      alert('Please fill out all required fields.');
      return;
    }
    const newDoctor: Doctor = {
      id: this.id,
      doctorName: this.doctorName,
      department: this.department,
      doctorEmail: this.doctorEmail,
      doctorMobileNo: this.doctorMobileNo,
      experience: this.experience,
      location: this.location,
      rating: this.rating,
      schedule: this.schedule,
      cost: this.cost,
      imageUrl: this.imageUrl
    };
    this.authService.addDoctor(newDoctor).subscribe(
      (response: any) => {
        console.log('Doctor added successfully', response);
        this.fetchDoctor();
      },
      (error: any) => {
        console.error('Error adding Doctor', error);
      }
    );
  }
}

interface Department {
  departmentName: string;
  description: string;
  status: number;
}

interface Doctor {
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
  
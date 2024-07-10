import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthenticationService, Doctor } from '../authentication.service'; // Ensure Doctor interface and AuthenticationService are imported

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  recordsPerPage = 10;
  searchQuery = '';
  filteredDoctors: Doctor[] = [];

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors(): void {
    this.authService.getDoctors().subscribe(
      (data: Doctor[]) => {
        this.filteredDoctors = data.map((doctor, index) => ({
          ...doctor,
          serialNo: index + 1
        }));
      },
      error => {
        console.error('Error fetching doctors', error);
      }
    );
  }

  onSearchQueryChange(): void {
    this.filteredDoctors = this.filteredDoctors.filter(doctor =>
      doctor.doctorName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      doctor.doctorMobileNo.includes(this.searchQuery) ||
      doctor.doctorEmail.toLowerCase().includes(this.searchQuery.toLowerCase())
    ).slice(0, this.recordsPerPage);
  }

  onRecordsPerPageChange(): void {
    this.filteredDoctors = this.filteredDoctors.slice(0, this.recordsPerPage);
  }

  deleteDoctor(doctor: Doctor): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Implement deletion logic here
        Swal.fire(
          'Deleted!',
          'The doctor has been deleted.',
          'success'
        );
      }
    });
  }
}

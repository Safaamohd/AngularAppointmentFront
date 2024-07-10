import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

interface Department {
  departmentName: string;
  description: string;
  status: string | number;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  filteredDepartments: Department[] = [];
  
  searchTerm: string = '';
  departmentName: string = '';
  description: string = '';
  status: string = 'Active';

  recordsPerPageOptions: number[] = [5, 10, 15, 20];
  recordsPerPage: number = 5;
  currentPage: number = 1;
  
  constructor(private authenticationServices: AuthenticationService) {}

  ngOnInit() {
    this.fetchDepartment();
  }

  fetchDepartment() {
    this.authenticationServices.getDepartments().subscribe(
      (departments: Department[]) => {
        this.departments = departments.map(department => ({
          ...department,
          status: department.status === 1 ? 'Active' : 'Inactive'
        }));
        this.updateFilteredDepartments();
      },
      error => {
        console.error("error fetching departments", error);
      }
    );
  }

  onSearch() {
    this.currentPage = 1; 
    this.updateFilteredDepartments();
  }

  onRecordsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.recordsPerPage = +selectElement.value;
    this.updateFilteredDepartments();
  }

  updateFilteredDepartments() {
    const start = (this.currentPage - 1) * this.recordsPerPage;
    const end = start + this.recordsPerPage;
    this.filteredDepartments = this.departments
      .filter(department => department.departmentName.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .slice(start, end);
  }

  onSubmit() {
    if (!this.departmentName || !this.description || !this.status) {
      alert('Please fill out all required fields.');
      return;
    }

    const newDepartment: Department = {
      departmentName: this.departmentName,
      description: this.description,
      status: this.status
    };

    this.departments.push(newDepartment);
    this.updateFilteredDepartments();
  }
}

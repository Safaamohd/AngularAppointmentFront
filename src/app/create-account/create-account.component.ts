import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  // id: number = '';
  fname: string = '';
  lname: string = '';
  email: string = '';
  mobileNo: string = '';
  address: string = '';
  password: string = '';
  passwordFieldType: boolean = true; // Initially password type

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  togglePasswordVisibility() {
    this.passwordFieldType = !this.passwordFieldType; // Toggle password visibility
  }

  onSubmit() {
    if (!this.isFormValid()) {
      alert('Please fill out all required fields.');
      return;
    }

    const patient = {
      // patientid: this.id,
      patientFirstName: this.fname,
      patientLastName: this.lname,
      patientEmail: this.email,
      patientMobileNo: this.mobileNo,
      patientAddress: this.address,
      patientPassword: this.password
    };

    this.authService.register(patient).subscribe(
      (response: any) => {
        console.log('Registration successful!', response);
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        console.error('Registration failed!', error);
        alert('Registration failed. Please try again later.');
      }
    );
  }

  private isFormValid(): boolean {
    return (
      !!this.fname &&
      !!this.lname &&
      !!this.email &&
      !!this.mobileNo &&
      !!this.address &&
      !!this.password
    );
  }
}

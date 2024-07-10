import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  loginModel: any = {};
  doctorModel: any = {};
  passwordFieldType: string = 'password';

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onLogin() {
    this.authenticationService.login(this.loginModel).subscribe(
      (response: any) => {
        console.log('User Login successful', response);
        const role = response.role;
        const id = response.id;
        if (response.message === 'Login successfully') {
          this.router.navigate(['/dashboard']);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login successfully',
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Incorrect username or password!',
            showConfirmButton: false,
            timer: 1500
          });
        }
      },
      (error: any) => {
        console.error('User Login failed', error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Login Failed',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }
}

    

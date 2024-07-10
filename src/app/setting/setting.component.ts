// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-setting',
//   templateUrl: './setting.component.html',
//   styleUrls: ['./setting.component.css']
// })
// export class SettingComponent implements OnInit {
//   contactForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.contactForm = this.fb.group({
//       newPassword: ['', Validators.required],
//       confirmPassword: ['', Validators.required],
//       theme: ['light', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.contactForm.get('theme')?.valueChanges.subscribe(theme => {
//       this.changeTheme(theme);
//     });
//   }

//   onSubmit() {
//     if (this.contactForm.invalid) {
//       return;
//     }

//     Swal.fire({
//       title: "Do you want to save the changes?",
//       showDenyButton: true,
//       showCancelButton: true,
//       confirmButtonText: "Save",
//       denyButtonText: `Don't save`
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire("Saved!", "", "success");
//         const { newPassword, confirmPassword } = this.contactForm.value;

//         if (newPassword !== confirmPassword) {
//           console.error('Passwords do not match');
//           return;
//         }

//         // Handle password change logic
//         console.log('Password changed successfully:', newPassword);

//         // Handle other form submission logic
//         console.log('Form submitted:', this.contactForm.value);
//       } else if (result.isDenied) {
//         Swal.fire("Changes are not saved", "", "info");
//       }
//     });
//   }

//   changeTheme(theme: string) {
//     const body = document.body;
//     if (theme === 'dark') {
//       body.classList.add('dark-mode');
//       body.classList.remove('light-mode');
//     } else {
//       body.classList.add('light-mode');
//       body.classList.remove('dark-mode');
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {
    this.contactForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      theme: ['light', Validators.required]
    });
  }

  ngOnInit(): void {
    this.contactForm.get('theme')?.valueChanges.subscribe(theme => {
      this.changeTheme(theme);
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        const { currentPassword, newPassword, confirmPassword } = this.contactForm.value;

        if (newPassword !== confirmPassword) {
          Swal.fire("Error", "Passwords do not match", "error");
          return;
        }

        this.authService.getCurrentPatient().subscribe(
          (patient: any) => {
            // Update only the necessary fields
            patient.patientPassword = newPassword;

            this.authService.updatePatient(patient).subscribe(
              () => {
                Swal.fire("Password updated!", "", "success");
              },
              (error: any) => {
                console.error('Error updating patient:', error);
                Swal.fire("Error", "Failed to update password", "error");
              }
            );
          },
          (error: any) => {
            console.error('Error fetching current patient:', error);
            Swal.fire("Error", "Failed to fetch current patient data", "error");
          }
        );
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  changeTheme(theme: string) {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
    } else {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
    }
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SettingComponent } from './setting/setting.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';
import { DepartmentComponent } from './department/department.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { SingUpDoctorComponent } from './sing-up-doctor/sing-up-doctor.component';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component'


const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent, // Use AuthLayoutComponent for default path
    children: [
      { path: '', component: HomeComponent },
      { path: 'create-account', component: CreateAccountComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'sign-up-doctor', component: SingUpDoctorComponent},
      { path: 'patient-appointmet', component: PatientAppointmentComponent}
      
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      
      { path: 'dashboard', component: DashboardComponent },
      { path: 'create-account', component: CreateAccountComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'doctor', component: DoctorComponent },
      { path: 'patient', component: PatientComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'appointment', component: AppointmentComponent }
     


      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

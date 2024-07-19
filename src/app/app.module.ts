import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingComponent } from './setting/setting.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DepartmentComponent } from './department/department.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { PatientComponent }  from './patient/patient.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    DashboardComponent,
    CreateAccountComponent,
    SidebarComponent,
    AppointmentComponent,
    SettingComponent,
    DoctorComponent,
    PatientComponent,
    DepartmentComponent,
    AuthLayoutComponent,
    MainLayoutComponent  
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgbDatepickerModule,
    HttpClientModule
  
  ],
  providers: [
    provideClientHydration(),
    AuthenticationService 

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


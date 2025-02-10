import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { TeacherRegistrationComponent } from './pages/teacher-registration/teacher-registration.component';
import { StudentRegistrationComponent } from './pages/student-registration/student-registration.component';
import { HomeComponent } from './pages/home/home.component';
import { WorkshopRegistrationComponent } from './pages/workshop-registration/workshop-registration.component';
import { CertificationComponent } from './pages/certification/certification.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'student-registration', component: StudentRegistrationComponent },
  { path: 'teacher-registration', component: TeacherRegistrationComponent },
  { path: 'workshop-registration', component: WorkshopRegistrationComponent},
  { path: 'certification', component: CertificationComponent}

];

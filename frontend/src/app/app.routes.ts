import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { TeacherRegistrationComponent } from './pages/teacher-registration/teacher-registration.component';
import { StudentRegistrationComponent } from './pages/student-registration/student-registration.component';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/teacher-registration', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'student-registration', component: StudentRegistrationComponent },
  { path: 'teacher-registration', component: TeacherRegistrationComponent },
];

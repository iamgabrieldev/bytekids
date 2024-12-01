import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherRequestService } from '../../services/requests/teacher-request.service';
import { AuthenticatorService } from '../../services/authenticator.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './teacher-registration.component.html',
  styleUrl: './teacher-registration.component.scss'
})
export class TeacherRegistrationComponent {
  teacherForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthenticatorService,
    private teacherService: TeacherRequestService,
    private router: Router
  ) {
    this.teacherForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      document: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      phone: [''],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    const teacherData = {
      name: this.teacherForm.value.name,
      document: this.teacherForm.value.document,
      phone: this.teacherForm.value.phone,
    };

    const loginData = {
      username: this.teacherForm.value.username,
      password: this.teacherForm.value.password,
    };

    this.teacherService.registerTeacher(teacherData).subscribe({
      next: (response: any) => {
        const professorId = response.id;
    
        const completeLoginData = {
          ...loginData,
          professorId,
        };
    
        this.authService.registerLogin(completeLoginData).subscribe({
          next: () => {
            alert('Professor e login cadastrados com sucesso!');
            this.router.navigate(['/student-registration']);             
          },
          error: () => {
            alert('Erro ao cadastrar login do professor.');
          },
        });
      },
      error: () => {
        alert('Erro ao cadastrar professor.');
      },
    });
  }

  get name() {
    return this.teacherForm.get('name');
  }

  get document() {
    return this.teacherForm.get('document');
  }

  get phone() {
    return this.teacherForm.get('phone');
  }
}

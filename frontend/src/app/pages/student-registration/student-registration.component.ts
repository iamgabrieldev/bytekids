import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentRequestService } from '../../services/requests/student-request.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './student-registration.component.html',
  styleUrl: './student-registration.component.scss'
})
export class StudentRegistrationComponent {
  studentForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private studentService: StudentRequestService) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      document: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      phone: [''],
      workshop: [null],
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.studentService.registerStudent(this.studentForm.value).subscribe({
        next: () => {
          this.successMessage = 'Student successfully registered!';
          this.errorMessage = '';
          this.studentForm.reset();
        },
        error: () => {
          this.successMessage = '';
          this.errorMessage = 'Error registering student. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
      this.successMessage = '';
    }
  }

  get name() {
    return this.studentForm.get('name');
  }

  get document() {
    return this.studentForm.get('document');
  }

  get phone() {
    return this.studentForm.get('phone');
  }

  get workshop() {
    return this.studentForm.get('workshop');
  }
}

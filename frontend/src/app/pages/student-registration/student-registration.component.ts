import { WorkshopRequestService } from './../../services/requests/workshop-request.service';
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
  workshops!: any;

  constructor(private fb: FormBuilder, private studentService: StudentRequestService, private workshopService: WorkshopRequestService) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      document: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      phone: [''],
      workshop: [null],
    });
  }

  ngOnInit() {
    this.getWorkshops(); 
  }

  onSubmit() {
    if (this.studentForm.valid) {
      debugger
      this.studentService.registerStudent(this.studentForm.value).subscribe({
        next: () => {
          alert('Estudante cadastrado com sucesso!');
          this.studentForm.reset();
        },
        error: () => {
          alert('Error ao registrar estudante, tente novamente!');
        },
      });
    } else {
      alert('Por favor, preencha os campos corretamente!');
    }
  }

  getWorkshops() {
    this.workshopService.getWorkshops().subscribe(
      (response: any) => {
        this.workshops = response;
      },
      (error: any) => {
        console.error('Erro ao recuperar workshops', error);
      }
    );
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

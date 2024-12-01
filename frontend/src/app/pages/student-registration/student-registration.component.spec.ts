import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentRegistrationComponent } from './student-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { StudentRequestService } from '../../services/requests/student-request.service';
import { HttpClientModule } from '@angular/common/http';

describe('StudentRegistrationComponent', () => {
  let component: StudentRegistrationComponent;
  let fixture: ComponentFixture<StudentRegistrationComponent>;
  let studentService: StudentRequestService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, StudentRegistrationComponent],
      providers: [StudentRequestService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRegistrationComponent);
    component = fixture.componentInstance;
    studentService = TestBed.inject(StudentRequestService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.studentForm).toBeDefined();
    expect(component.studentForm.controls['name']).toBeDefined();
    expect(component.studentForm.controls['document']).toBeDefined();
    expect(component.studentForm.controls['phone']).toBeDefined();
    expect(component.studentForm.controls['workshop']).toBeDefined();
  });

  it('should display error if form is invalid and submit is triggered', () => {
    component.studentForm.controls['name'].setValue('');
    component.studentForm.controls['document'].setValue('');
    component.onSubmit();
    expect(component.errorMessage).toBe('Por favor, preencha os campos corretamente!');
    expect(component.successMessage).toBe('');
  });

  it('should call registerStudent when form is valid', () => {
    const registerStudentSpy = jest.spyOn(studentService, 'registerStudent').mockReturnValue(of({}));
    component.studentForm.controls['name'].setValue('John Doe');
    component.studentForm.controls['document'].setValue('123456');
    component.studentForm.controls['phone'].setValue('123456789');
    component.studentForm.controls['workshop'].setValue('Workshop A');
    component.onSubmit();
    expect(registerStudentSpy).toHaveBeenCalled();
    expect(component.successMessage).toBe('Estudante cadastrado com sucesso!');
    expect(component.errorMessage).toBe('');
  });

  it('should display error message if registerStudent fails', () => {
    const registerStudentSpy = jest.spyOn(studentService, 'registerStudent').mockReturnValue(throwError(() => new Error('Error ao registrar estudante')));
    component.studentForm.controls['name'].setValue('John Doe');
    component.studentForm.controls['document'].setValue('123456');
    component.studentForm.controls['phone'].setValue('123456789');
    component.studentForm.controls['workshop'].setValue('Workshop A');
    component.onSubmit();
    expect(component.successMessage).toBe('');
    expect(component.errorMessage).toBe('Error ao registrar estudante, tente novamente!');
  });
});

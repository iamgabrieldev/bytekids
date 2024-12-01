import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherRegistrationComponent } from './teacher-registration.component';
import { TeacherRequestService } from '../../services/requests/teacher-request.service';
import { AuthenticatorService } from '../../services/authenticator.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('TeacherRegistrationComponent', () => {
  let component: TeacherRegistrationComponent;
  let fixture: ComponentFixture<TeacherRegistrationComponent>;
  let teacherService: TeacherRequestService;
  let authService: AuthenticatorService;
  let router: Router;

  beforeEach(() => {
    const teacherServiceMock = {
      registerTeacher: jest.fn(),
    };

    const authServiceMock = {
      registerLogin: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [TeacherRegistrationComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: TeacherRequestService, useValue: teacherServiceMock },
        { provide: AuthenticatorService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherRegistrationComponent);
    component = fixture.componentInstance;
    teacherService = TestBed.inject(TeacherRequestService);
    authService = TestBed.inject(AuthenticatorService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call registerTeacher and registerLogin on form submit', () => {
    const teacherData = { name: 'John Doe', document: '123456', phone: '987654321' };
    const loginData = { username: 'johndoe', password: 'password123' };
    const response = { id: 1 };

    component.teacherForm.setValue({
      name: teacherData.name,
      document: teacherData.document,
      phone: teacherData.phone,
      username: loginData.username,
      password: loginData.password,
    });

    // Mocking HTTP requests
    jest.spyOn(teacherService, 'registerTeacher').mockReturnValue(of(response));
    jest.spyOn(authService, 'registerLogin').mockReturnValue(of({}));

    // Mocking router navigation
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.onSubmit();

    expect(teacherService.registerTeacher).toHaveBeenCalledWith(teacherData);
    expect(authService.registerLogin).toHaveBeenCalledWith({
      ...loginData,
      professorId: response.id,
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/student-registration']);
  });

  it('should handle error when registerTeacher fails', () => {
    const teacherData = { name: 'John Doe', document: '123456', phone: '987654321' };

    component.teacherForm.setValue({
      name: teacherData.name,
      document: teacherData.document,
      phone: teacherData.phone,
      username: 'johndoe',
      password: 'password123',
    });

    jest.spyOn(teacherService, 'registerTeacher').mockReturnValue(throwError(() => new Error('Erro ao cadastrar professor.')));

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    component.onSubmit();

    expect(alertSpy).toHaveBeenCalledWith('Erro ao cadastrar professor.');
  });

  it('should handle error when registerLogin fails', () => {
    const teacherData = { name: 'John Doe', document: '123456', phone: '987654321' };
    const loginData = { username: 'johndoe', password: 'password123' };
    const response = { id: 1 };

    component.teacherForm.setValue({
      name: teacherData.name,
      document: teacherData.document,
      phone: teacherData.phone,
      username: loginData.username,
      password: loginData.password,
    });

    jest.spyOn(teacherService, 'registerTeacher').mockReturnValue(of(response));
    jest.spyOn(authService, 'registerLogin').mockReturnValue(throwError(() => new Error('Erro ao cadastrar login do professor.')));

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    component.onSubmit();

    expect(alertSpy).toHaveBeenCalledWith('Erro ao cadastrar login do professor.');
  });

  it('should display form validation errors', () => {
    const nameInput = component.teacherForm.controls['name'];
    const documentInput = component.teacherForm.controls['document'];

    nameInput.setValue('');
    documentInput.setValue('');

    expect(nameInput.valid).toBeFalsy();
    expect(documentInput.valid).toBeFalsy();
    expect(component.teacherForm.valid).toBeFalsy();
  });
});

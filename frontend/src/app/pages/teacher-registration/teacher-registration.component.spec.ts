import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherRegistrationComponent } from './teacher-registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TeacherRequestService } from '../../services/requests/teacher-request.service';
import { AuthenticatorService } from '../../services/authenticator.service';
import { Router, RouterModule } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

class MockTeacherRequestService {
  registerTeacher = jest.fn();
}

class MockAuthenticatorService {
  registerLogin = jest.fn();
}

describe('TeacherRegistrationComponent', () => {
  let component: TeacherRegistrationComponent;
  let fixture: ComponentFixture<TeacherRegistrationComponent>;
  let teacherService: MockTeacherRequestService;
  let authService: MockAuthenticatorService;
  let router: Router;

  beforeEach(async () => {
    teacherService = new MockTeacherRequestService();
    authService = new MockAuthenticatorService();

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        TeacherRegistrationComponent
      ],
      providers: [
        { provide: TeacherRequestService, useValue: teacherService },
        { provide: AuthenticatorService, useValue: authService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRegistrationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  // Teste para verificar se o componente foi criado
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Teste para verificar a criação do formulário
  it('should create a form with 5 controls', () => {
    expect(component.teacherForm.contains('name')).toBe(true);
    expect(component.teacherForm.contains('document')).toBe(true);
    expect(component.teacherForm.contains('phone')).toBe(true);
    expect(component.teacherForm.contains('username')).toBe(true);
    expect(component.teacherForm.contains('password')).toBe(true);
  });

  // Teste para a validação do campo 'name'
  it('should mark name as invalid if less than 3 characters', () => {
    const name = component.teacherForm.get('name');
    name?.setValue('Wi');
    expect(name?.invalid).toBe(true);
  });

  it('should mark name as valid if it has 3 or more characters', () => {
    const name = component.teacherForm.get('name');
    name?.setValue('William');
    expect(name?.valid).toBe(true);
  });

  // Teste para a validação do campo 'document'
  it('should mark document as invalid if less than 5 characters', () => {
    const document = component.teacherForm.get('document');
    document?.setValue('123');
    expect(document?.invalid).toBe(true);
  });

  it('should mark document as valid if it has 5 or more characters', () => {
    const document = component.teacherForm.get('document');
    document?.setValue('12345');
    expect(document?.valid).toBe(true);
  });

  // Teste para o método 'onSubmit' com sucesso no cadastro do professor
  it('should call registerTeacher and registerLogin and navigate to student-registration', () => {
    const mockTeacher = { name: 'William', document: '12345', phone: '' };
    const mockLogin = { username: 'wwatanabe', password: 'password123' };
    const mockResponse = { id: 1 };

    component.teacherForm.setValue({
      name: 'William',
      document: '12345',
      phone: '',
      username: 'wwatanabe',
      password: 'password123',
    });

    teacherService.registerTeacher.mockReturnValue(of(mockResponse));
    authService.registerLogin.mockReturnValue(of({}));

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.onSubmit();

    expect(teacherService.registerTeacher).toHaveBeenCalledWith(mockTeacher);
    expect(authService.registerLogin).toHaveBeenCalledWith({
      ...mockLogin,
      professorId: mockResponse.id,
    });
    expect(alertSpy).toHaveBeenCalledWith('Professor e login cadastrados com sucesso!');
    expect(navigateSpy).toHaveBeenCalledWith(['/student-registration']);
  });

 

  // Teste para o método 'onSubmit' com erro no cadastro do login do professor
  it('should display an error message if registerLogin fails', () => {
    const mockTeacher = { name: 'William', document: '12345', phone: '' };
    const mockLogin = { username: 'wwatanabe', password: 'password123' };
    const mockResponse = { id: 1 };

    component.teacherForm.setValue({
      name: 'William',
      document: '12345',
      phone: '',
      username: 'wwatanabe',
      password: 'password123',
    });

    teacherService.registerTeacher.mockReturnValue(of(mockResponse));
    authService.registerLogin.mockReturnValue(throwError(() => new Error('Erro ao cadastrar login do professor')));

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    component.onSubmit();

    expect(alertSpy).toHaveBeenCalledWith('Erro ao cadastrar login do professor.');
  });


});

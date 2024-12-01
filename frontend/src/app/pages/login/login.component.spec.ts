import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthenticatorService } from '../../services/authenticator.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('@angular/router');

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticatorService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, LoginComponent], // Adicionando HttpClientTestingModule
      providers: [
        FormBuilder,
        AuthenticatorService, // O HttpClient será injetado automaticamente aqui
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticatorService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create the component and form', () => {
    expect(component).toBeTruthy();
    expect(component.loginForm).toBeTruthy();
    expect(component.loginForm.controls['username']).toBeTruthy();
    expect(component.loginForm.controls['password']).toBeTruthy();
  });

  it('should call authenticate and navigate on successful login', () => {
    const mockResponse = 'Autenticação bem-sucedida!';
    const mockUsername = 'testuser';
    const mockPassword = 'password123';

    component.loginForm.setValue({ username: mockUsername, password: mockPassword });

    authService.authenticate = jest.fn().mockReturnValue(of(mockResponse));
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.onSubmit();

    expect(authService.authenticate).toHaveBeenCalledWith(mockUsername, mockPassword);
    expect(navigateSpy).toHaveBeenCalledWith(['/student-registration']);
  });

  it('should show an alert with error message if authentication fails', () => {
    const mockUsername = 'testuser';
    const mockPassword = 'wrongpassword';

    component.loginForm.setValue({ username: mockUsername, password: mockPassword });

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    authService.authenticate = jest.fn().mockReturnValue(throwError(() => new Error('Invalid credentials')));

    component.onSubmit();

    expect(alertSpy).toHaveBeenCalledWith('Usuário ou senha inválidos.');
  });

  it('should show an alert if form is invalid', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    component.loginForm.setValue({ username: '', password: '' });

    component.onSubmit();

    expect(alertSpy).toHaveBeenCalledWith('Por favor, preencha todos os campos corretamente!');
  });
});

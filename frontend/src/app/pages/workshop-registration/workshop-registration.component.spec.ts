import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkshopRegistrationComponent } from './workshop-registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WorkshopRequestService } from '../../services/requests/workshop-request.service';
import { AuthenticatorService } from '../../services/authenticator.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

class MockWorkshopRequestService {
  registerWorkshop = jest.fn().mockReturnValue(of({ id: 1 }));
  editAlunos = jest.fn().mockReturnValue(of({}));
  getAlunos = jest.fn().mockReturnValue(of([]));
  getProfessores = jest.fn().mockReturnValue(of([]));
}

class MockAuthenticatorService {
  registerLogin = jest.fn().mockReturnValue(of({}));
}

describe('WorkshopRegistrationComponent', () => {
  let component: WorkshopRegistrationComponent;
  let fixture: ComponentFixture<WorkshopRegistrationComponent>;
  let workshopService: MockWorkshopRequestService;
  let authService: MockAuthenticatorService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        WorkshopRegistrationComponent
      ],
      providers: [
        { provide: WorkshopRequestService, useClass: MockWorkshopRequestService },
        { provide: AuthenticatorService, useClass: MockAuthenticatorService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopRegistrationComponent);
    component = fixture.componentInstance;
    workshopService = TestBed.inject(WorkshopRequestService) as any;
    authService = TestBed.inject(AuthenticatorService) as any;
    router = TestBed.inject(Router);

    component.workshopForm.setValue({
      name: '',
      turma: '',
      professor: null,
      alunos: []
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 4 controls', () => {
    expect(component.workshopForm.contains('name')).toBe(true);
    expect(component.workshopForm.contains('turma')).toBe(true);
    expect(component.workshopForm.contains('professor')).toBe(true);
    expect(component.workshopForm.contains('alunos')).toBe(true);
  });

  it('should mark name as invalid if less than 3 characters', () => {
    component.workshopForm.get('name')?.setValue('Wi');
    expect(component.workshopForm.get('name')?.invalid).toBe(true);
  });

  it('should mark name as valid if it has 3 or more characters', () => {
    component.workshopForm.get('name')?.setValue('William');
    expect(component.workshopForm.get('name')?.valid).toBe(true);
  });

  it('should call getAlunos and set alunos property', () => {
    const mockAlunos = [{ id: 1, nome: 'Aluno 1' }];
    workshopService.getAlunos.mockReturnValue(of(mockAlunos));

    component.getAlunos();

    expect(workshopService.getAlunos).toHaveBeenCalled();
    expect(component.alunos).toEqual(mockAlunos);
  });

  it('should call getProfessores and set professores property', () => {
    const mockProfessores = [{ id: 1, nome: 'Professor 1' }];
    workshopService.getProfessores.mockReturnValue(of(mockProfessores));

    component.getProfessores();

    expect(workshopService.getProfessores).toHaveBeenCalled();
    expect(component.professores).toEqual(mockProfessores);
  });

  it('should call registerWorkshop and editAlunos and navigate to student-registration', () => {
    component.workshopForm.setValue({
      name: 'Workshop 1',
      turma: 'Turma A',
      professor: { id: 1, nome: 'Professor 1' },
      alunos: [{ id: 1, nome: 'Aluno 1' }]
    });

    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.onSubmit();

    expect(workshopService.registerWorkshop).toHaveBeenCalled();
    expect(workshopService.editAlunos).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Workshop e login cadastrados com sucesso!');
    expect(navigateSpy).toHaveBeenCalledWith(['/student-registration']);
  });
});

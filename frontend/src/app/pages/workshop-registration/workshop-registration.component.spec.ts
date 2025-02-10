import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkshopRegistrationComponent } from './workshop-registration.component';
import { WorkshopRequestService } from '../../services/requests/workshop-request.service';
import { AuthenticatorService } from '../../services/authenticator.service';
import { of } from 'rxjs';

class MockWorkshopRequestService {
  getAlunos = jest.fn().mockReturnValue(of([]));
  getProfessores = jest.fn().mockReturnValue(of([]));
  registerWorkshop = jest.fn().mockReturnValue(of({ id: 1 }));
  editAlunos = jest.fn().mockReturnValue(of({}));
}

class MockAuthenticatorService {
  registerLogin = jest.fn().mockReturnValue(of({}));
}

describe('WorkshopRegistrationComponent', () => {
  let component: WorkshopRegistrationComponent;
  let fixture: ComponentFixture<WorkshopRegistrationComponent>;
  let workshopService: MockWorkshopRequestService;
  let authService: MockAuthenticatorService;

  beforeEach(async () => {
    workshopService = new MockWorkshopRequestService();
    authService = new MockAuthenticatorService();

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        WorkshopRegistrationComponent
      ],
      providers: [
        { provide: WorkshopRequestService, useValue: workshopService },
        { provide: AuthenticatorService, useValue: authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkshopRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.workshopForm.value).toEqual({
      name: '',
      turma: '',
      professor: '',
      alunos: ''
    });
  });

  it('should call getProfessores and getAlunos on init', () => {
    const getProfessoresSpy = jest.spyOn(component, 'getProfessores');
    const getAlunosSpy = jest.spyOn(component, 'getAlunos');

    component.ngOnInit();

    expect(getProfessoresSpy).toHaveBeenCalled();
    expect(getAlunosSpy).toHaveBeenCalled();
  });

  it('should submit form and register workshop', () => {
    component.workshopForm.setValue({
      name: 'Workshop Test',
      turma: 'Turma Test',
      professor: { id: 1, nome: 'Professor Test', documento: '123456', telefone: '123456789' },
      alunos: [{ id: 1, nome: 'Aluno Test', documento: '654321', telefone: '987654321', workshop: null }]
    });

    const registerWorkshopSpy = jest.spyOn(workshopService, 'registerWorkshop');
    const editAlunosSpy = jest.spyOn(workshopService, 'editAlunos');

    component.onSubmit();

    expect(registerWorkshopSpy).toHaveBeenCalledWith({
      nome: 'Workshop Test',
      turma: 'Turma Test',
      alunos: [{
        id: undefined,
        nome: undefined,
        documento: undefined,
        telefone: undefined,
        workshop: undefined
      }],
      professor: {
        id: 1,
        nome: 'Professor Test',
        documento: '123456',
        telefone: '123456789'
      }
    });

    expect(editAlunosSpy).toHaveBeenCalled();
  });
});

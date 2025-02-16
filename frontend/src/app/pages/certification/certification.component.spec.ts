import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificationComponent } from './certification.component';
import { CertificationRequestService } from '../../services/requests/certification-request.service';
import { WorkshopRequestService } from '../../services/requests/workshop-request.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('CertificationComponent', () => {
  let component: CertificationComponent;
  let fixture: ComponentFixture<CertificationComponent>;
  let mockCertificationService: jest.Mocked<CertificationRequestService>;
  let mockWorkshopService: jest.Mocked<WorkshopRequestService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockCertificationService = {
      getFrequencia: jest.fn(),
      getCertificadoLink: jest.fn(),
    } as any;

    mockWorkshopService = {
      getWorkshops: jest.fn().mockReturnValue(of([])), // Retorna Observable vazio
      getAlunos: jest.fn().mockReturnValue(of([])),
    } as any;

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('1'),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: CertificationRequestService, useValue: mockCertificationService },
        { provide: WorkshopRequestService, useValue: mockWorkshopService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getWorkshops and getAlunos on init', () => {
    jest.spyOn(component, 'getWorkshops');
    jest.spyOn(component, 'getAlunos');
    component.ngOnInit();

    expect(component.getWorkshops).toHaveBeenCalled();
    expect(component.getAlunos).toHaveBeenCalled();
  });

  it('should handle getWorkshops success', () => {
    const workshops = [{ id: 1, nome: 'Workshop 1' }];
    mockWorkshopService.getWorkshops.mockReturnValue(of(workshops));
    
    component.getWorkshops();

    expect(mockWorkshopService.getWorkshops).toHaveBeenCalled();
    expect(component.workshops).toEqual(workshops);
  });

  it('should handle getWorkshops error', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockWorkshopService.getWorkshops.mockReturnValue(throwError(() => new Error('Error')));

    component.getWorkshops();

    expect(mockWorkshopService.getWorkshops).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao recuperar workshops', new Error('Error'));
    consoleErrorSpy.mockRestore();
  });
});

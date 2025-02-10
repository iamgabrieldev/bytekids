import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CertificationComponent } from './certification.component';
import { CertificationRequestService } from '../../services/requests/certification-request.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('CertificationComponent', () => {
  let component: CertificationComponent;
  let fixture: ComponentFixture<CertificationComponent>;
  let certificateService: jasmine.SpyObj<CertificationRequestService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationComponent], 
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(CertificationComponent);
    component = fixture.componentInstance;
    certificateService = TestBed.inject(CertificationRequestService) as jasmine.SpyObj<CertificationRequestService>;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir uma mensagem de erro se a frequência for insuficiente', () => {
    component.alunoId = 1;
    component.workshopId = 101;
    certificateService.getFrequencia.and.returnValue(of(10));

    component.verificarPresenca();

    expect(component.mensagem).toBe('Frequência insuficiente. Você tem 10 presença(s).');
    expect(component.certificadoLink).toBe('');
  });

  it('deve gerar o certificado se a frequência for suficiente', () => {
    component.alunoId = 1;
    component.workshopId = 101;
    certificateService.getFrequencia.and.returnValue(of(15));
    certificateService.getCertificadoLink.and.returnValue(of('https://certificado.com/123'));

    component.verificarPresenca();

    expect(certificateService.getCertificadoLink).toHaveBeenCalledWith(1, 101);
    expect(component.certificadoLink).toBe('https://certificado.com/123');
    expect(component.mensagem).toBe('Certificado gerado com sucesso!');
  });

  it('deve tratar o erro ao verificar a presença', () => {
    component.alunoId = 1;
    component.workshopId = 101;
    certificateService.getFrequencia.and.returnValue(throwError(() => new Error('Erro na API')));

    component.verificarPresenca();

    expect(component.mensagem).toBe('Erro ao verificar a frequência.');
  });

  it('deve tratar o erro ao gerar o certificado', () => {
    component.alunoId = 1;
    component.workshopId = 101;
    certificateService.getFrequencia.and.returnValue(of(15));
    certificateService.getCertificadoLink.and.returnValue(throwError(() => new Error('Erro ao gerar certificado')));

    component.verificarPresenca();

    expect(component.mensagem).toBe('Erro ao gerar o certificado.');
  });
});

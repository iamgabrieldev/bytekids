import { TestBed } from '@angular/core/testing';
import { CertificationRequestService } from './certification-request.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CertificationRequestService', () => {
  let service: CertificationRequestService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/presenca';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CertificationRequestService]
    });

    service = TestBed.inject(CertificationRequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar a frequência corretamente', () => {
    const alunoId = 1;
    const workshopId = 101;
    const mockFrequencia = 15;

    service.getFrequencia(alunoId, workshopId).subscribe((frequencia) => {
      expect(frequencia).toBe(mockFrequencia);
    });

    const req = httpMock.expectOne(`${apiUrl}/visualizar?alunoId=${alunoId}&workshopId=${workshopId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFrequencia);
  });

  it('deve retornar o link do certificado corretamente', () => {
    const alunoId = 2;
    const workshopId = 202;
    const mockCertificadoLink = 'http://certificado.com/link';

    service.getCertificadoLink(alunoId, workshopId).subscribe((link) => {
      expect(link).toBe(mockCertificadoLink);
    });

    const req = httpMock.expectOne(`${apiUrl}/certificado?alunoId=${alunoId}&workshopId=${workshopId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCertificadoLink);
  });

  it('deve lidar com erro ao buscar frequência', () => {
    const alunoId = 3;
    const workshopId = 303;

    service.getFrequencia(alunoId, workshopId).subscribe(
      () => fail('Deveria ter ocorrido um erro'),
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(`${apiUrl}/visualizar?alunoId=${alunoId}&workshopId=${workshopId}`);
    req.flush('Erro no servidor', { status: 500, statusText: 'Server Error' });
  });

  it('deve lidar com erro ao buscar link do certificado', () => {
    const alunoId = 4;
    const workshopId = 404;

    service.getCertificadoLink(alunoId, workshopId).subscribe(
      () => fail('Deveria ter ocorrido um erro'),
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne(`${apiUrl}/certificado?alunoId=${alunoId}&workshopId=${workshopId}`);
    req.flush('Erro no servidor', { status: 500, statusText: 'Server Error' });
  });
});

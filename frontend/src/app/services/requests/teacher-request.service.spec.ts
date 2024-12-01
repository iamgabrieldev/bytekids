import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TeacherRequestService } from './teacher-request.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('TeacherRequestService', () => {
  let service: TeacherRequestService;
  let httpMock: HttpTestingController;

  // Dados simulados para os testes
  const teacherData = {
    name: 'John Doe',
    document: '123456789',
    phone: '987654321'
  };

  const mappedTeacherData = {
    id: 0,
    nome: 'John Doe',
    documento: '123456789',
    telefone: '987654321',
  };

  // Configuração do TestBed
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa o módulo de testes HTTP
      providers: [TeacherRequestService], // Fornece o serviço que será testado
    });

    service = TestBed.inject(TeacherRequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Teste 1: Verificar se o serviço está criado corretamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Teste 2: Verificar se o método registerTeacher envia a solicitação HTTP correta
  it('should send a POST request to register a teacher', () => {
    service.registerTeacher(teacherData).subscribe(response => {
      expect(response).toEqual({}); // Verifique a resposta conforme o comportamento esperado
    });

    // Captura da requisição HTTP
    const req = httpMock.expectOne('http://localhost:8080/api/professores/cadastrar');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mappedTeacherData);

    // Fornecendo uma resposta fictícia para a requisição
    req.flush({});
  });

  // Teste 3: Verificar se o erro é tratado quando a requisição falha
  it('should handle error when the HTTP request fails', () => {
    const errorMessage = 'Erro ao registrar o professor';

    service.registerTeacher(teacherData).subscribe(
      response => fail('should have failed with an error'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.error).toBe(errorMessage);
      }
    );

    // Captura da requisição HTTP e fornecimento de um erro
    const req = httpMock.expectOne('http://localhost:8080/api/professores/cadastrar');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  // Após cada teste, limpa as requisições pendentes
  afterEach(() => {
    httpMock.verify();
  });
});

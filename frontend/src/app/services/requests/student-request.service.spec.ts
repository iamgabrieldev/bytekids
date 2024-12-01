import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentRequestService } from './student-request.service';

describe('StudentRequestService', () => {
  let service: StudentRequestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentRequestService],
    });

    service = TestBed.inject(StudentRequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map student data correctly and call the API', () => {
    const mockStudentData = {
      name: 'John Doe',
      document: '123456789',
      phone: '987654321',
    };

    const expectedMappedData = {
      id: 0,
      nome: 'John Doe',
      documento: '123456789',
      telefone: '987654321',
      workshop: null,
    };

    service.registerStudent(mockStudentData).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/alunos/cadastrar');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(expectedMappedData);

    req.flush({ success: true });
  });
});
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticatorService } from './authenticator.service';
import { HttpParams } from '@angular/common/http';

describe('AuthenticatorService', () => {
    let service: AuthenticatorService;
    let httpMock: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AuthenticatorService],
      });
  
      service = TestBed.inject(AuthenticatorService);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      httpMock.verify();
    });
  
    it('should call the authenticate API with the correct parameters', () => {
      const username = 'testUser';
      const password = 'testPassword';
      const mockResponse = 'success';
  
      service.authenticate(username, password).subscribe(response => {
        expect(response).toBe(mockResponse);
      });
  
      const req = httpMock.expectOne('http://localhost:8080/api/login/autenticar');
      expect(req.request.method).toBe('POST');
  
      // Verificar se os parâmetros estão presentes na string do corpo
      const body = req.request.body.toString();
      expect(body).toContain('username=testUser');
      expect(body).toContain('password=testPassword');
  
      req.flush(mockResponse);
    });
  
    it('should call the registerLogin API with the correct parameters', () => {
      const loginData = { professorId: '123', username: 'testUser', password: 'testPassword' };
      const mockResponse = { status: 'success' };
  
      service.registerLogin(loginData).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });
  
      const req = httpMock.expectOne('http://localhost:8080/api/login/cadastrar');
      expect(req.request.method).toBe('POST');
  
      // Verificar se os parâmetros estão presentes na string do corpo
      const body = req.request.body.toString();
      expect(body).toContain('professorId=123');
      expect(body).toContain('username=testUser');
      expect(body).toContain('password=testPassword');
  
      req.flush(mockResponse);
    });
  });
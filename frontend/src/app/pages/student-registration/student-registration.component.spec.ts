import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentRegistrationComponent } from './student-registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StudentRequestService } from '../../services/requests/student-request.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

// Mock do serviço StudentRequestService
class MockStudentRequestService {
  registerStudent = jest.fn();
}

describe('StudentRegistrationComponent', () => {
    let component: StudentRegistrationComponent;
    let fixture: ComponentFixture<StudentRegistrationComponent>;
    let studentService: MockStudentRequestService;
  
    beforeEach(async () => {
      studentService = new MockStudentRequestService();

      // Criar o mock do ActivatedRoute
    const activatedRouteMock = {
        snapshot: {
          paramMap: of({}) // Retorna um objeto vazio ou mock de parâmetros que você pode querer testar
        }
      };
  
      await TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule,
            FormsModule,
            StudentRegistrationComponent, // Agora importado em vez de declarado
          ],
        providers: [
          { provide: StudentRequestService, useValue: studentService },
          { provide: ActivatedRoute, useValue: activatedRouteMock },
        ],
      }).compileComponents();
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(StudentRegistrationComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    // Teste para verificar se o componente foi criado
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    // Teste para verificar a criação do formulário
    it('should create a form with 4 controls', () => {
      expect(component.studentForm.contains('name')).toBe(true);
      expect(component.studentForm.contains('document')).toBe(true);
      expect(component.studentForm.contains('phone')).toBe(true);
      expect(component.studentForm.contains('workshop')).toBe(true);
    });
  
    // Teste para a validação do campo 'name'
    it('should mark name as invalid if less than 3 characters', () => {
      const name = component.studentForm.get('name');
      name?.setValue('Jo');
      expect(name?.invalid).toBe(true);
    });
  
    it('should mark name as valid if it has 3 or more characters', () => {
      const name = component.studentForm.get('name');
      name?.setValue('John');
      expect(name?.valid).toBe(true);
    });
  
    // Teste para a validação do campo 'document'
    it('should mark document as invalid if less than 5 characters', () => {
      const document = component.studentForm.get('document');
      document?.setValue('123');
      expect(document?.invalid).toBe(true);
    });
  
    it('should mark document as valid if it has 5 or more characters', () => {
      const document = component.studentForm.get('document');
      document?.setValue('12345');
      expect(document?.valid).toBe(true);
    });
  
    // Teste para o método 'onSubmit' com sucesso
    it('should call registerStudent and reset form on successful registration', () => {
      const mockStudent = { name: 'John', document: '12345', phone: '', workshop: null };
      component.studentForm.setValue(mockStudent);
  
      studentService.registerStudent.mockReturnValue(of({}));
  
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
      component.onSubmit();
  
      expect(studentService.registerStudent).toHaveBeenCalledWith(mockStudent);
      expect(alertSpy).toHaveBeenCalledWith('Estudante cadastrado com sucesso!');
      expect(component.studentForm.pristine).toBe(true);
    });
  
    // Teste para o método 'onSubmit' com erro
    it('should display an error message on registration failure', () => {
      const mockStudent = { name: 'John', document: '12345', phone: '', workshop: null };
      component.studentForm.setValue(mockStudent);
  
      studentService.registerStudent.mockReturnValue(throwError(() => new Error('Error')));
  
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
      component.onSubmit();
  
      expect(studentService.registerStudent).toHaveBeenCalledWith(mockStudent);
      expect(alertSpy).toHaveBeenCalledWith('Error ao registrar estudante, tente novamente!');
    });
  
    // Teste para o comportamento do formulário inválido
    it('should show an alert if form is invalid', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
      component.onSubmit();
  
      expect(alertSpy).toHaveBeenCalledWith('Por favor, preencha os campos corretamente!');
    });
  });
  
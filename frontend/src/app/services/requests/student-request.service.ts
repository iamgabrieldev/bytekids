import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isObservable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentRequestService {

  private apiUrl = 'http://localhost:8080/api/alunos'; 

  constructor(private http: HttpClient) {}

  registerStudent(studentData: any): Observable<any> {
    const mappedStudentData = {
      id: 0,
      nome: studentData.name,        
      documento: studentData.document, 
      telefone: studentData.phone, 
      workshop: null
    };
    return this.http.post(`${this.apiUrl}/cadastrar`, mappedStudentData);
  }
}

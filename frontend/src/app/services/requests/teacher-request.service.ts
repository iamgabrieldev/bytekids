import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherRequestService {

  private apiUrl = 'http://localhost:8080/api/professores'; 

  constructor(private http: HttpClient) {}

  registerTeacher(teacherData: any): Observable<any> {
    const mappedTeacherData = {
      id: 0,
      nome: teacherData.name,        
      documento: teacherData.document, 
      telefone: teacherData.phone, 
    };
  
    return this.http.post(`${this.apiUrl}/cadastrar`, mappedTeacherData);
  }
}

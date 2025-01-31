import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkshopRequestService {
  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}

  getAlunos(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/alunos`);
  }

  getProfessores(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/professores`);
  }

  registerWorkshop(workshopData: any): Observable<any> {
    const mappedWorkshopData = {
      id: 0,
      nome: workshopData.nome,        
      turma: workshopData.turma, 
      professor: workshopData.professor, 
      alunos: workshopData.alunos
    };
    return this.http.post(`${this.apiUrl}/workshops/cadastrar`, mappedWorkshopData);
  }
}

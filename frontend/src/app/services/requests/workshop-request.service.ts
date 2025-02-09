import { HttpClient, HttpParams } from '@angular/common/http';
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

  getWorkshops(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/workshops`);
  }

  registerPresenca(presencaData: any): Observable<any> {
    const mappedPresencaData = {
      alunoId: presencaData.alunoId,
      workshopId: presencaData.workshopId,
      status: "presente"
    };
    return this.http.post(`${this.apiUrl}/presenca/registrar`, mappedPresencaData);
  }

  editAlunos(alunoData: any): Observable<any> {
    const mappedAlunoData = {
      id: alunoData.id,
      nome: alunoData.nome,
      documento: alunoData.documento,
      workshop: alunoData.workshop,
      telefone: alunoData.telefone
    };
    return this.http.put(`${this.apiUrl}/alunos/alterar-workshop`, mappedAlunoData);
  }

  getFrequenciaAluno(alunoId: number, workshopId: number): Observable<number> {
    const params = new HttpParams()
      .set('alunoId', alunoId.toString())
      .set('workshopId', workshopId.toString());

    return this.http.get<number>(`${this.apiUrl}/presenca/visualizar`, { params });
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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificationRequestService {

  private apiUrl = 'http://localhost:8080/api/presenca';

  constructor(private http: HttpClient) {}

  getFrequencia(alunoId: number, workshopId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/visualizar?alunoId=${alunoId}&workshopId=${workshopId}`);
  }

  getCertificadoLink(alunoId: number, workshopId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/certificado?alunoId=${alunoId}&workshopId=${workshopId}`, { responseType: 'text' });
  }
}

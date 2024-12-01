import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  private apiUrl = 'http://localhost:8080/api/login'; 

  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<string> {
    const mappedTeacherData = new HttpParams()
    .set('username', username)
    .set('password', password); 

    return this.http.post(`${this.apiUrl}/autenticar`, mappedTeacherData, {
      responseType: 'text',
    });
  }

  registerLogin(loginData: any): Observable<any> {

    const mappedTeacherData = new HttpParams()
      .set('professorId', loginData.professorId)
      .set('username', loginData.username)
      .set('password', loginData.password);

    return this.http.post(`${this.apiUrl}/cadastrar`, mappedTeacherData);
  }

}



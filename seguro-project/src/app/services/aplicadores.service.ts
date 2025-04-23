import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aplicador } from '../interfaces/aplicador.interface';

@Injectable({
  providedIn: 'root'
})
export class AplicadoresService {
  private apiUrl = 'http://localhost:3001/api/aplicadores';

  constructor(private http: HttpClient) { }

  getAplicadores(page: number = 1, limit: number = 10, search: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get(this.apiUrl, { params });
  }

  getAplicador(codigo: number): Observable<Aplicador> {
    return this.http.get<Aplicador>(`${this.apiUrl}/${codigo}`);
  }

  createAplicador(aplicador: Aplicador): Observable<Aplicador> {
    return this.http.post<Aplicador>(this.apiUrl, aplicador);
  }

  updateAplicador(codigo: number, aplicador: Aplicador): Observable<Aplicador> {
    return this.http.put<Aplicador>(`${this.apiUrl}/${codigo}`, aplicador);
  }

  deleteAplicador(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${codigo}`);
  }
}

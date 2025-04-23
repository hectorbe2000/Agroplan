import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parcela } from '../interfaces/parcela.interface';

@Injectable({
  providedIn: 'root'
})
export class ParcelasService {
  private apiUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) { }

  getParcelas(page: number = 1, limit: number = 10, search: string = ''): Observable<{ data: Parcela[], total: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<{ data: Parcela[], total: number }>(`${this.apiUrl}/parcelas`, { params });
  }

  getParcela(registro: number): Observable<Parcela> {
    return this.http.get<Parcela>(`${this.apiUrl}/parcelas/${registro}`);
  }

  createParcela(parcela: Parcela): Observable<Parcela> {
    return this.http.post<Parcela>(`${this.apiUrl}/parcelas`, parcela);
  }

  updateParcela(registro: number, parcela: Parcela): Observable<Parcela> {
    return this.http.put<Parcela>(`${this.apiUrl}/parcelas/${registro}`, parcela);
  }

  deleteParcela(registro: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/parcelas/${registro}`);
  }

  searchParcelas(term: string): Observable<Parcela[]> {
    const params = new HttpParams().set('search', term);
    return this.http.get<Parcela[]>(`${this.apiUrl}/parcelas/search`, { params });
  }
}

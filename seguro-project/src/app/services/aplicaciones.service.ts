import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aplicacion } from '../interfaces/aplicacion.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AplicacionesService {
  private apiUrl = `${environment.apiUrl}/aplicaciones`;

  constructor(private http: HttpClient) { }

  getAplicaciones(page: number = 1, limit: number = 10, search: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get(this.apiUrl, { params });
  }

  getAplicacion(registro: number): Observable<Aplicacion> {
    return this.http.get<Aplicacion>(`${this.apiUrl}/${registro}`);
  }

  createAplicacion(aplicacion: Aplicacion): Observable<Aplicacion> {
    return this.http.post<Aplicacion>(this.apiUrl, aplicacion);
  }

  updateAplicacion(registro: number, aplicacion: Aplicacion): Observable<Aplicacion> {
    // Asegurarse de que los campos opcionales estén incluidos
    const aplicacionData = {
      ...aplicacion,
      receta_nro: aplicacion.receta_nro || '',
      fecha_exp: aplicacion.fecha_exp || '',
      reg_producto: aplicacion.reg_producto || '',
      entidad_comercializadora: aplicacion.entidad_comercializadora || ''
    };
    return this.http.put<Aplicacion>(`${this.apiUrl}/${registro}`, aplicacionData);
  }

  deleteAplicacion(registro: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${registro}`);
  }

  exportToExcel(registro?: number): Observable<Blob> {
    const url = registro ? `${this.apiUrl}/${registro}/export/excel` : `${this.apiUrl}/export/excel`;
    return this.http.get(url, {
      responseType: 'blob'
    });
  }
}

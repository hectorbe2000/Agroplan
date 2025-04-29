import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Producto {
  registro?: number;
  descripcion: string;
  ingrediente_activo: string;
  producto: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProducto(registro: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${registro}`);
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  updateProducto(registro: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${registro}`, producto);
  }

  deleteProducto(registro: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${registro}`);
  }
}

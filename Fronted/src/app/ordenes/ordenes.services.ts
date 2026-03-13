import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/api/ordenes';

  getOrdenes(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  postOrden(orden: any): Observable<any> {
    return this.http.post(this.url, orden);
  }

  updateEstado(id: number, estado: string): Observable<any> {
    return this.http.put(`${this.url}/${id}/estado`, { estado });
  }
}
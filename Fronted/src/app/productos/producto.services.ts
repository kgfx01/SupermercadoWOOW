import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/api/productos';

  public listaProductos = signal<any[]>([]);

  cargarProductos() {
    this.http.get<any[]>(this.url).subscribe({
      next: (res) => this.listaProductos.set(res),
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  getDashboardTotals(): Observable<any> {
    return this.http.get(`${this.url}/totals`);
  }

  getLowStockProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/low-stock`);
  }

  postProduct(prod: any): Observable<any> {
    return this.http.post(this.url, prod);
  }

  updateProduct(id: number, prod: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, prod);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
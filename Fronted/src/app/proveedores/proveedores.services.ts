import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000/api/proveedores';

  public listaProveedores = signal<any[]>([]);

  cargarProveedores() {
    this.http.get<any[]>(this.url).subscribe({
      next: (res) => this.listaProveedores.set(res),
      error: (err) => console.error('Error al cargar proveedores', err)
    });
  }

  postProveedor(prov: any): Observable<any> {
    return this.http.post(this.url, prov);
  }

  updateProveedor(id: number, prov: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, prov);
  }

  deleteProveedor(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
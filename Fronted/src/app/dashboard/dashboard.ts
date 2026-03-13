import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  totalProductos: number = 0;
  totalProveedores: number = 0;
  totalOrdenes: number = 0;
  
  productosStockBajo: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarTotales();
    this.cargarStockBajo();
  }

  cargarTotales() {
    this.http.get('http://localhost:3000/api/productos/totals').subscribe({
      next: (res: any) => {
        this.totalProductos = res.productos;
        this.totalProveedores = res.proveedores;
        this.totalOrdenes = res.ordenes; 
      },
      error: (err) => console.error('Error en totales:', err)
    });
  }

  cargarStockBajo() {
    this.http.get('http://localhost:3000/api/productos/low-stock').subscribe({
      next: (res: any) => {
        this.productosStockBajo = res;
      },
      error: (err) => console.error('Error en stock bajo:', err)
    });
  }
}
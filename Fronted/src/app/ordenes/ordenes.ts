import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './ordes.html'
})
export class OrdenesComponent implements OnInit {
  ordenes: any[] = [];
  proveedores: any[] = [];
  productos: any[] = [];
  nuevaOrden = { id_proveedor: 0, id_producto: 0, cantidad: 0 };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listarOrdenes();
    this.listarProveedores();
    this.listarProductos();
  }

  listarOrdenes() {
    this.http.get('http://localhost:3000/api/ordenes').subscribe((res: any) => this.ordenes = res);
  }

  listarProveedores() {
    this.http.get('http://localhost:3000/api/proveedores').subscribe((res: any) => this.proveedores = res);
  }

  listarProductos() {
    this.http.get('http://localhost:3000/api/productos').subscribe((res: any) => this.productos = res);
  }

  guardarOrden() {
    if (this.nuevaOrden.id_proveedor === 0 || this.nuevaOrden.id_producto === 0 || this.nuevaOrden.cantidad <= 0) {
      alert("Faltan datos por completar");
      return;
    }
    this.http.post('http://localhost:3000/api/ordenes', this.nuevaOrden).subscribe(() => {
      this.listarOrdenes();
      this.nuevaOrden = { id_proveedor: 0, id_producto: 0, cantidad: 0 };
      alert("Orden Guardada");
    });
  }

  cambiarEstado(id: number, nuevoEstado: string) {
    this.http.put(`http://localhost:3000/api/ordenes/${id}`, { estado: nuevoEstado }).subscribe(() => {
      this.listarOrdenes();
    });
  }
}
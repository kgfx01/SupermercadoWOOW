import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from './producto.services';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html'
})
export class ProductosComponent implements OnInit {
  private prodService = inject(ProductoService);
  listaProductos = this.prodService.listaProductos;

  editando = false;
  idEditar: number | null = null;

  nuevoProducto: any = {
    codigo: '', nombre: '', descripcion: '', precio: 0,
    stock_actual: 0, stock_minimo: 5, categoria: 'General'
  };

  ngOnInit() { this.prodService.cargarProductos(); }

  registrar() {
    if (this.editando && this.idEditar) {
      this.prodService.updateProduct(this.idEditar, this.nuevoProducto).subscribe({
        next: () => {
          alert('Actualizado con éxito');
          this.resetForm();
        }
      });
    } else {
      this.prodService.postProduct(this.nuevoProducto).subscribe({
        next: () => {
          alert('Guardado con éxito');
          this.resetForm();
        }
      });
    }
  }

  prepararEdicion(p: any) {
    this.editando = true;
    this.idEditar = p.id;
    this.nuevoProducto = { ...p }; 
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar este producto?')) {
      this.prodService.deleteProduct(id).subscribe({
        next: () => this.prodService.cargarProductos()
      });
    }
  }

  resetForm() {
    this.editando = false;
    this.idEditar = null;
    this.limpiar();
    this.prodService.cargarProductos();
  }

  limpiar() {
    this.nuevoProducto = { codigo: '', nombre: '', descripcion: '', precio: 0, stock_actual: 0, stock_minimo: 5, categoria: 'General' };
  }
}
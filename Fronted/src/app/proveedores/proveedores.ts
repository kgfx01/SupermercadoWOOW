import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProveedorService } from './proveedores.services'; 

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedores.html'
})
export class ProveedoresComponent implements OnInit {
  private provService = inject(ProveedorService);
  
  listaProveedores = this.provService.listaProveedores;

  editando = false;
  idEditar: number | null = null;

  nuevoProveedor: any = {
    nombre: '', contacto: '', telefono: '', email: '', direccion: ''
  };

  ngOnInit() { 
    this.provService.cargarProveedores(); 
  }

  registrar() {
    if (this.editando && this.idEditar) {
      this.provService.updateProveedor(this.idEditar, this.nuevoProveedor).subscribe({
        next: () => {
          alert('Actualizado');
          this.resetForm();
        }
      });
    } else {
      this.provService.postProveedor(this.nuevoProveedor).subscribe({
        next: () => {
          alert('Guardado');
          this.resetForm();
        }
      });
    }
  }

  prepararEdicion(p: any) {
    this.editando = true;
    this.idEditar = p.id;
    this.nuevoProveedor = { ...p };
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar proveedor?')) {
      this.provService.deleteProveedor(id).subscribe({
        next: () => this.provService.cargarProveedores()
      });
    }
  }

  resetForm() {
    this.editando = false;
    this.idEditar = null;
    this.nuevoProveedor = { nombre: '', contacto: '', telefono: '', email: '', direccion: '' };
    this.provService.cargarProveedores();
  }
}
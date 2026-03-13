import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './usuarios.html'
})
export class UsuariosComponent implements OnInit {
  listaUsuarios: any[] = [];
  nuevoUsuario = { nombre: '', email: '', password: '', rol: 'empleado' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.http.get('http://localhost:3000/api/usuarios').subscribe((res: any) => {
      this.listaUsuarios = res;
    });
  }

  registrar() {
    this.http.post('http://localhost:3000/api/usuarios/registrar', this.nuevoUsuario).subscribe({
      next: () => {
        alert('¡Usuario creado con éxito!');
        this.obtenerUsuarios(); 
        this.nuevoUsuario = { nombre: '', email: '', password: '', rol: 'empleado' }; 
      },
      error: () => alert('Error al crear usuario')
    });
  }
}
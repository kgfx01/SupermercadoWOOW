import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  constructor(private router: Router) {}

  estaLogueado(): boolean {
    return localStorage.getItem('token') !== null;
  }

  //Aqui verificamos si el rol es administrador
  esAdmin(): boolean {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    return usuario.rol === 'admin';
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
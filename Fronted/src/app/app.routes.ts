import { Routes } from '@angular/router';
import { LoginComponent } from './login/login'; 
import { DashboardComponent } from './dashboard/dashboard';
import { ProductosComponent } from './productos/productos';
import { ProveedoresComponent } from './proveedores/proveedores'; 
import { OrdenesComponent } from './ordenes/ordenes'; 
import { UsuariosComponent } from './usuarios/usuarios';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'ordenes', component: OrdenesComponent }, 
  { path: 'usuarios', component: UsuariosComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
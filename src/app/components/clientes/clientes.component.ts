import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.http.get<any[]>('http://localhost:9090/cliente/obtener').subscribe({
      next: (data) => (this.clientes = data),
      error: (err) => console.error('Error al cargar clientes', err),
    });
  }
  confirmarEliminacion(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
      this.eliminarCliente(id);
    }
  }
  eliminarCliente(id: number): void {
    const body = { id }; // El backend espera un objeto con el id en el cuerpo

    this.http
      .delete<{ borrado: string }>('http://localhost:9090/cliente/borrar1', {
        body, // Angular 16+ permite body en DELETE
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe({
        next: (response) => {
          if (response.borrado === 'ok') {
            alert('Cliente eliminado correctamente');
            this.clientes = this.clientes.filter(
              (cliente) => cliente.id !== id
            );
          } else {
            alert('Error al eliminar el cliente');
          }
        },
        error: (err) => console.error('Error en la eliminación', err),
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = [];

  constructor(
    public pedidoService: PedidoService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.user()?.id;
    this.pedidoService.obtenerPedidosCliente(userId).subscribe((res) => {
      this.pedidos = res.pedidos || [];

      // Obtener nombre de cada plato
      this.pedidos.forEach((pedido) => {
        const platoId = pedido.plato_id; // Asegurar que sea un número
        this.pedidoService.obtenerNombrePlato(platoId).subscribe((res) => {
          pedido.platoNombre = res.nombre;
        });
      });
    });
  }
}

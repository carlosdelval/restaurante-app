import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatosService, Plato } from './../../services/platos.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { PedidoService } from './../../services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plato-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-plato.component.html',
  styleUrls: ['./info-plato.component.scss'],
})
export class InfoPlatoComponent implements OnInit {
  plato!: Plato;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private platosService: PlatosService,
    private pedidoService: PedidoService, // ✅ Inyectamos el servicio de pedidos
    private authService: AuthService, // ✅ Inyectamos el servicio de autenticación
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.error = 'ID de plato no válido';
      this.loading = false;
      return;
    }

    this.platosService.getPlato(id).subscribe({
      next: (data) => {
        this.plato = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar el plato';
        console.error(err);
        this.loading = false;
      },
    });
  }

  // ✅ Método que se ejecutará al hacer clic en el botón
  realizarPedido(): void {
    const usuario = this.authService.user(); // Obtenemos el usuario logueado

    if (!usuario) {
      alert('Debes estar logueado para hacer un pedido');
      return;
    }

    this.pedidoService.crearPedido(usuario.id, this.plato.id, this.plato.precio).subscribe({
      next: (response) => {
        console.log('Pedido realizado con éxito:', response);
        alert('Pedido realizado con éxito');
      },
      error: (error) => {
        console.error('Error al realizar pedido', error);
        alert('Hubo un problema con el pedido');
      },
    });
  }
}

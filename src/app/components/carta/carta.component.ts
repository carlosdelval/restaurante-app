import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PlatosService, Plato } from '../../services/platos.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.scss'],
  animations: [
    trigger('cardAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class CartaComponent implements OnInit {
  platos: Plato[] = [];

  constructor(private platosService: PlatosService) {}

  ngOnInit(): void {
    this.platosService.getAllPlatos().subscribe({
      next: (data) => (this.platos = data),
      error: (err) => console.error('Error cargando platos:', err),
    });
  }
}

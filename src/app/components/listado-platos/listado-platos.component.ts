import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PlatosService, Plato } from '../../services/platos.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-listado-platos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './listado-platos.component.html',
  styleUrls: ['./listado-platos.component.scss'],
  animations: [
    trigger('cardAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ListadoPlatosComponent implements OnInit {
  platos: Plato[] = [];

  constructor(private platosService: PlatosService) {}

  ngOnInit(): void {
    this.platosService.getPlatosDestacados().subscribe({
      next: (data) => (this.platos = data),
      error: (err) => console.error('Error cargando platos:', err),
    });
  }
}

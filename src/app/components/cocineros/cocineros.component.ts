import { Component, OnInit } from '@angular/core';
import { CocineroService } from '../../services/cocinero.service';
import { Cocinero } from '../../models/cocinero.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cocineros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocineros.component.html',
  styleUrls: ['./cocineros.component.css']
})
export class CocinerosComponent implements OnInit {
  cocineros: Cocinero[] = [];

  constructor(private cocineroService: CocineroService) {}

  ngOnInit(): void {
    this.cocineroService.obtenerCocineros().subscribe({
      next: (data) => {
        this.cocineros = data;
        console.log('Cocineros cargados:', this.cocineros);
      },
      error: (err) => console.error('Error al obtener cocineros', err)
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatosService, Plato } from './../../services/platos.service';
import { CommonModule } from '@angular/common';

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

  constructor(private route: ActivatedRoute, private platosService: PlatosService) {}

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
}

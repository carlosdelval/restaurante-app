import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  img: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlatosService {
  private apiUrl = 'http://localhost:9090/plato/obtener';

  constructor(private http: HttpClient) {}

  getPlatosDestacados(): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.apiUrl);
  }
}

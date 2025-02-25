import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cocinero } from '../models/cocinero.model';

@Injectable({
  providedIn: 'root'
})
export class CocineroService {
  private apiUrl = 'http://localhost:9090/cocinero';

  constructor(private http: HttpClient) {}

  obtenerCocineros(): Observable<Cocinero[]> {
    return this.http.get<Cocinero[]>(`${this.apiUrl}/obtener`);
  }
}

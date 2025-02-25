import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private apiUrl = 'http://localhost:9090/pedidos';

  constructor(private http: HttpClient) {}

  crearPedido(
    clienteId: number,
    platoId: number,
    total: number
  ): Observable<any> {
    const pedido = {
      cliente_id: clienteId,
      plato_id: platoId,
      total: total,
      fecha_pedido: new Date(),
    };
    return this.http.post(`${this.apiUrl}/nuevo`, pedido);
  }

  obtenerPedidosCliente(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/obtener1`, { id });
  }

  obtenerTodosLosPedidos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/obtener`);
  }

  obtenerNombreCliente(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/obtener-cliente`, { id });
  }

  obtenerNombrePlato(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/obtener-plato`, { id });
  }
}

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
  private apiUrl2 = 'http://localhost:9090/plato/obtener2';

  constructor(private http: HttpClient) {}

  getPlatosDestacados(): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.apiUrl2);
  }

  getPlato(id: number): Observable<Plato> {
    return this.http.get<Plato>(`${this.apiUrl}/${id}`);
  }

  getAllPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.apiUrl);
  }

  estaEnCarrito(plato: Plato): boolean {
    return false;
  }

  cantidadEnCarrito(plato: Plato): number {
    return 0;
  }

  precioTotalCarrito(): number {
    return 0;
  }

  // Método para obtener un plato por su id
  getPlatoById(id: number): Observable<Plato> {
    return this.http.get<Plato>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener los platos de una categoría
  getPlatosByCategoria(categoria: string): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.apiUrl}/categoria/${categoria}`);
  }

  // Método para buscar platos por su nombre
  buscarPlatos(nombre: string): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.apiUrl}/buscar/${nombre}`);
  }

  // Método para obtener todas las categorías
  getCategorias(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categorias`);
  }

  // Método para añadir un plato
  addPlato(plato: Plato): Observable<Plato> {
    return this.http.post<Plato>(this.apiUrl, plato);
  }

  // Método para actualizar un plato
  updatePlato(plato: Plato): Observable<Plato> {
    return this.http.put<Plato>(`${this.apiUrl}/${plato.id}`, plato);
  }

  // Método para borrar un plato
  deletePlato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener el precio total de un pedido
  precioTotalPedido(platos: Plato[]): number {
    return platos.reduce((acc, plato) => acc + plato.precio, 0);
  }

  // Método para vaciar el carrito
  vaciarCarrito(): void {
    console.log('Carrito vaciado');
  }

  // Método para obtener los platos del carrito
  getPlatosCarrito(): Plato[] {
    return [];
  }

  // Método para realizar un pedido
  realizarPedido(platos: Plato[]): void {
    console.log('Pedido realizado:', platos);
  }

  // Método para obtener todos los pedidos
  getPedidos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.apiUrl}/pedidos`);
  }

  // Método para obtener un pedido por su id
  getPedidoById(id: number): Observable<Plato> {
    return this.http.get<Plato>(`${this.apiUrl}/pedido/${id}`);
  }
}

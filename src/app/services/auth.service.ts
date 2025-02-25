import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:9090/cliente';
  user = signal<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage(); // 🔹 Recuperar usuario al iniciar la app
  }

  register(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addnew`, datos);
  }

  getUserFromToken(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/datos-usuario`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  verificarUsuario(username: string): Observable<{ existe: boolean }> {
    return this.http.post<{ existe: boolean }>(
      `${this.apiUrl}/verificar-usuario`,
      { username }
    );
  }

  login(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/autentica`, datos);
  }

  setUser(data: any): void {
    const userData = {
      id: data.id,
      nombre: data.nombre,
      email: data.email,
      username: data.username,
      role: data.role,
    };
    localStorage.setItem('user', JSON.stringify(userData)); // 🔹 Guardar usuario
    this.user.set(userData);
  }

  loadUserFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      // 🔹 Verifica que `localStorage` está disponible
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.user.set(JSON.parse(storedUser));
      }
    }
  }

  getUser() {
    return this.user || 'null';
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user'); // 🔹 Eliminar usuario guardado
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    const user = this.user();
    return user && user.role === 'admin';
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/obtener1/${id}`);
  }

  editUser(datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar1`, datos);
  }
}

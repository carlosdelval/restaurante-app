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

  constructor(private http: HttpClient, private router: Router) {}

  register(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addnew`, datos);
  }

  login(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/autentica`, datos);
  }

  setUser(data: any): void {
    this.user.set({
      id: data.id,
      nombre: data.nombre,
      email: data.email,
      username: data.username,
      role: data.role,
    });
  }

  getUser() {
    return this.user || 'null';
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  verificarUsuario(username: string): Observable<{ existe: boolean }> {
    return this.http.post<{ existe: boolean }>(
      `${this.apiUrl}/verificar-usuario`,
      { username }
    );
  }

  isAdmin(): boolean {
    const user = this.user();
    return user && user.role === 'admin';
  }
}

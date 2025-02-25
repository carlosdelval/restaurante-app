import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {

    if (this.authService.isAdmin()) {
      return true; // ✅ Permitir acceso si es admin
    }

    // ❌ Si no es admin, redirigir al home
    this.router.navigate(['/']);
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.login();
    }
  }

  login(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.result === 'OK') {
          localStorage.setItem('jwt', response.jwt);

          // 🔹 Obtener datos del usuario usando el JWT
          this.authService.getUserFromToken(response.jwt).subscribe({
            next: (userData) => {
              this.authService.setUser(userData);
              alert('¡Bienvenido!');
              this.router.navigate(['/']);
            },
            error: (err) => console.error('Error obteniendo usuario', err),
          });
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
      error: (err) => console.error('Error en login', err),
    });
  }
}

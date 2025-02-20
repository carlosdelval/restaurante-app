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
          localStorage.setItem('jwt', response.jwt); // Guardamos el token
          this.authService.setUser(response); // Actualizamos el estado del usuario
          alert('¡Bienvenido!');
          this.router.navigate(['/']); // Redirige al home
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
      error: (err) => console.error('Error en login', err),
    });
  }
}


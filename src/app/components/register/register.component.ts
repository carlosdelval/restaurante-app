import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  usernameEnUso = false;
  passwordsNoCoinciden = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    // Escuchar cambios en los inputs de contraseña para validar en tiempo real
    this.registerForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  verificarUsuario(): void {
    const username = this.registerForm.get('username')?.value;
    if (username) {
      this.authService.verificarUsuario(username).subscribe(response => {
        this.usernameEnUso = response.existe;
      });
    }
  }

  // Método para verificar si las contraseñas coinciden
  checkPasswords(): void {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    this.passwordsNoCoinciden = password !== confirmPassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid && !this.passwordsNoCoinciden && !this.usernameEnUso) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          alert('Registro exitoso, ¡bienvenido!');
          this.router.navigate(['/']); // Redirige al login
        },
        error: (err) => console.error('Error en registro', err),
      });
    }
  }
}

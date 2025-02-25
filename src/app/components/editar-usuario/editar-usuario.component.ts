import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent implements OnInit {
  editForm!: FormGroup;
  usernameEnUso = false;
  userId!: number;
  user: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      username: ['', Validators.required],
      rol: ['']
    });

    this.route.params.subscribe(params => {
      this.userId = +params['id']; // Obtener el ID del usuario desde la ruta
      this.cargarUsuario(this.userId);
    });
  }

  cargarUsuario(id: number): void {
    this.authService.getUserById(id).subscribe({
      next: (user: { [key: string]: any; }) => {
        this.editForm.patchValue(user); // Rellenar el formulario con los datos del usuario
      },
      error: (err: any) => console.error('Error al cargar el usuario', err),
    });
  }

  verificarUsuario(): void {
    const username = this.editForm.get('username')?.value;
    if (username) {
      this.authService.verificarUsuario(username).subscribe(response => {
        this.usernameEnUso = response.existe;
      });
    }
  }

  onSubmit(): void {
    if (this.editForm.valid && !this.usernameEnUso) {
      this.authService.editUser(this.editForm.value).subscribe({
        next: () => {
          alert('Cambios realizados con éxito.');
          this.router.navigate(['/clientes']); // Redirige a clientes
        },
        error: (err) => console.error('Error en edición.', err),
      });
    }
  }
}

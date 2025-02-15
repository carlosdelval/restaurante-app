import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  usernameExists = false;
  passwordMismatch = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  checkUsername() {
    const username = this.registerForm.get('username')?.value;
    this.userService.checkUsername(username).subscribe(exists => {
      this.usernameExists = exists;
    });
  }

  onSubmit() {
    if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) {
      this.passwordMismatch = true;
      return;
    }
    console.log('Formulario válido, enviar datos a la API...');
  }
}

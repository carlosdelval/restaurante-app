import { Routes } from '@angular/router';
import { ListadoPlatosComponent } from './components/listado-platos/listado-platos.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', component: ListadoPlatosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigir a login por defecto
  { path: '**', redirectTo: 'login' }, // Cualquier ruta incorrecta va a login
];

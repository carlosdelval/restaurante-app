import { Routes } from '@angular/router';
import { ListadoPlatosComponent } from './components/listado-platos/listado-platos.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InfoPlatoComponent } from './components/info-plato/info-plato.component';
import { CartaComponent } from './components/carta/carta.component';
import { AuthGuard } from './guards/auth.guard';
import { ClientesComponent } from './components/clientes/clientes.component';

export const routes: Routes = [
  { path: '', component: ListadoPlatosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'plato/:id', component: InfoPlatoComponent },
  {path: 'carta', component: CartaComponent},
  {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]}
];

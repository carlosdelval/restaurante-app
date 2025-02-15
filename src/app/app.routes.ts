import { Routes } from '@angular/router';
import { ListadoPlatosComponent } from './components/listado-platos/listado-platos.component';

export const routes: Routes = [
  { path: '', component: ListadoPlatosComponent },
  { path: '**', redirectTo: '' },
];

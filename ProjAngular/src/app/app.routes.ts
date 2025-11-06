import { Routes } from '@angular/router';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ClientesComponent } from './clientes/clientes.component';

export const routes: Routes = [
  { path: '', component: ClientesComponent },
  { path: 'pedidos', component: PedidosComponent },
];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrosComponent } from './registros/registros.component';
import { RegistroDetalheComponent } from './registro-detalhe/registro-detalhe.component';
import { RegistroNovoComponent } from './registro-novo/registro-novo.component';
import { RegistroEditarComponent } from './registro-editar/registro-editar.component';

const routes: Routes = [
  {
    path: 'registros',
    component: RegistrosComponent,
    data: { title: 'Lista de Registros' }
  },
  {
    path: 'registro-detalhe/:id',
    component: RegistroDetalheComponent,
    data: { title: 'Detalhe do Registro' }
  },
  //Adicionado a mais
  {
    path: 'registro-detalhe/',
    component: RegistroDetalheComponent,
    data: { title: 'Detalhe do Registro' }
  },
  //
  {
    path: 'registro-novo',
    component: RegistroNovoComponent,
    data: { title: 'Adicionar Registro' }
  },
  {
    path: 'registro-editar',
    component: RegistroEditarComponent,
    data: { title: 'Editar o Registro' }
  },
  {
    path: 'registro-editar/:id',
    component: RegistroEditarComponent,
    data: { title: 'Editar o Registro' }
  },
  { path: '',
    redirectTo: '/registros',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

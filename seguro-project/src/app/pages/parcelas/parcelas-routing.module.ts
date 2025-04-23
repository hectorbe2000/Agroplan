import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParcelasPage } from './parcelas.page';

const routes: Routes = [
  {
    path: '',
    component: ParcelasPage
  },
  {
    path: 'nuevo',
    loadChildren: () => import('./parcela-form/parcela-form.module').then(m => m.ParcelaFormPageModule)
  },
  {
    path: 'editar/:id',
    loadChildren: () => import('./parcela-form/parcela-form.module').then(m => m.ParcelaFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParcelasPageRoutingModule {}

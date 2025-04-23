import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProveedoresPage } from './proveedores.page';

const routes: Routes = [
  {
    path: '',
    component: ProveedoresPage
  },
  {
    path: 'nuevo',
    loadChildren: () => import('./proveedor-form/proveedor-form.module').then(m => m.ProveedorFormPageModule)
  },
  {
    path: 'editar/:id',
    loadChildren: () => import('./proveedor-form/proveedor-form.module').then(m => m.ProveedorFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedoresPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProveedorFormPage } from './proveedor-form.page';

const routes: Routes = [
  {
    path: '',
    component: ProveedorFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedorFormPageRoutingModule {}

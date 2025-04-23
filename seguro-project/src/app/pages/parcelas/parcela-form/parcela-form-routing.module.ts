import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParcelaFormPage } from './parcela-form.page';

const routes: Routes = [
  {
    path: '',
    component: ParcelaFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParcelaFormPageRoutingModule {}

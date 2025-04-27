import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { AplicacionesPage } from './aplicaciones.page';
import { AplicacionFormPage } from './aplicacion-form/aplicacion-form.page';

const routes: Routes = [
  {
    path: '',
    component: AplicacionesPage
  },
  {
    path: 'crear',
    component: AplicacionFormPage
  },
  {
    path: 'editar/:registro',
    component: AplicacionFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AplicacionesPage,
    AplicacionFormPage
  ]
})
export class AplicacionesPageModule {}

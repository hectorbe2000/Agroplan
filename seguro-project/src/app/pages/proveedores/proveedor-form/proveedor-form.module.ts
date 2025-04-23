import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProveedorFormPageRoutingModule } from './proveedor-form-routing.module';

import { ProveedorFormPage } from './proveedor-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProveedorFormPageRoutingModule
  ],
  declarations: [ProveedorFormPage]
})
export class ProveedorFormPageModule {}

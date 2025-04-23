import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParcelaFormPageRoutingModule } from './parcela-form-routing.module';

import { ParcelaFormPage } from './parcela-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ParcelaFormPageRoutingModule
  ],
  declarations: [ParcelaFormPage]
})
export class ParcelaFormPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParcelasPageRoutingModule } from './parcelas-routing.module';

import { ParcelasPage } from './parcelas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParcelasPageRoutingModule
  ],
  declarations: [ParcelasPage]
})
export class ParcelasPageModule {}

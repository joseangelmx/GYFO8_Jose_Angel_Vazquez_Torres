import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentTypesRoutingModule } from './equipment-types-routing.module';
import { EquipmentTypesComponent } from './equipment-types.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EquipmentTypesComponent
  ],
  imports: [
    CommonModule,
    EquipmentTypesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EquipmentTypesModule { }

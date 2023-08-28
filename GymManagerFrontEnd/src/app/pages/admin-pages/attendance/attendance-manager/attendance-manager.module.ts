import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceManagerRoutingModule } from './attendance-manager-routing.module';
import { AttendanceManagerComponent } from './attendance-manager.component';
import { MaterialModule } from 'src/material.module';


@NgModule({
  declarations: [
    AttendanceManagerComponent
  ],
  imports: [
    CommonModule,
    AttendanceManagerRoutingModule,
    MaterialModule
  ]
})
export class AttendanceManagerModule { }

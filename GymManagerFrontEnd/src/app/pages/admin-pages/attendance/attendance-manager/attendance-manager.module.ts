import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceManagerRoutingModule } from './attendance-manager-routing.module';
import { AttendanceManagerComponent } from './attendance-manager.component';


@NgModule({
  declarations: [
    AttendanceManagerComponent
  ],
  imports: [
    CommonModule,
    AttendanceManagerRoutingModule
  ]
})
export class AttendanceManagerModule { }

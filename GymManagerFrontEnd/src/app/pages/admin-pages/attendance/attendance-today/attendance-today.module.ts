import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceTodayRoutingModule } from './attendance-today-routing.module';
import { AttendanceTodayComponent } from './attendance-today.component';


@NgModule({
  declarations: [
    AttendanceTodayComponent
  ],
  imports: [
    CommonModule,
    AttendanceTodayRoutingModule
  ]
})
export class AttendanceTodayModule { }

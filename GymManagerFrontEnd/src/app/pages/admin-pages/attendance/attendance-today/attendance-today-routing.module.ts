import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceTodayComponent } from './attendance-today.component';

const routes: Routes = [{ path: '', component: AttendanceTodayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceTodayRoutingModule { }

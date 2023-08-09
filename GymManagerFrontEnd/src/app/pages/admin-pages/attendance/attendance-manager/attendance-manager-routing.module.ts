import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceManagerComponent } from './attendance-manager.component';

const routes: Routes = [{ path: '', component: AttendanceManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceManagerRoutingModule { }

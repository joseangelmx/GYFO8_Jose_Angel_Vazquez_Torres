import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberOutComponent } from './member-out.component';

const routes: Routes = [{ path: '', component: MemberOutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberOutRoutingModule { }

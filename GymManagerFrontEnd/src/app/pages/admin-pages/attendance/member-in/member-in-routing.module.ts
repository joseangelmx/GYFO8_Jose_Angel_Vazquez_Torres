import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberInComponent } from './member-in.component';

const routes: Routes = [{ path: '', component: MemberInComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberInRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageMembersComponent } from './manage-members.component';

const routes: Routes = [{ path: '', component: ManageMembersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageMembersRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewMemberComponent } from './new-member.component';

const routes: Routes = [{ path: '', component: NewMemberComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewMemberRoutingModule { }

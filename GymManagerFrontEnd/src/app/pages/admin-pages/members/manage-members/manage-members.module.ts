import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageMembersRoutingModule } from './manage-members-routing.module';
import { ManageMembersComponent } from './manage-members.component';


@NgModule({
  declarations: [
    ManageMembersComponent
  ],
  imports: [
    CommonModule,
    ManageMembersRoutingModule
  ]
})
export class ManageMembersModule { }

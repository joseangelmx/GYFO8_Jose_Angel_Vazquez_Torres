import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberOutRoutingModule } from './member-out-routing.module';
import { MemberOutComponent } from './member-out.component';


@NgModule({
  declarations: [
    MemberOutComponent
  ],
  imports: [
    CommonModule,
    MemberOutRoutingModule
  ]
})
export class MemberOutModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberInRoutingModule } from './member-in-routing.module';
import { MemberInComponent } from './member-in.component';


@NgModule({
  declarations: [
    MemberInComponent
  ],
  imports: [
    CommonModule,
    MemberInRoutingModule
  ]
})
export class MemberInModule { }

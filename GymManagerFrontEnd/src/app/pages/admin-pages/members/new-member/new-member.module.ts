import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewMemberRoutingModule } from './new-member-routing.module';
import { NewMemberComponent } from './new-member.component';


@NgModule({
  declarations: [
    NewMemberComponent
  ],
  imports: [
    CommonModule,
    NewMemberRoutingModule
  ]
})
export class NewMemberModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberOutRoutingModule } from './member-out-routing.module';
import { MemberOutComponent } from './member-out.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MemberOutComponent
  ],
  imports: [
    CommonModule,
    MemberOutRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MemberOutModule { }

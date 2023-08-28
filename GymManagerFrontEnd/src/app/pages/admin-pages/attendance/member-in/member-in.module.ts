import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberInRoutingModule } from './member-in-routing.module';
import { MemberInComponent } from './member-in.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MemberInComponent
  ],
  imports: [
    CommonModule,
    MemberInRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MemberInModule { }

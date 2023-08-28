import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewMemberRoutingModule } from './new-member-routing.module';
import { NewMemberComponent } from './new-member.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewMemberComponent
  ],
  imports: [
    CommonModule,
    NewMemberRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class NewMemberModule { }

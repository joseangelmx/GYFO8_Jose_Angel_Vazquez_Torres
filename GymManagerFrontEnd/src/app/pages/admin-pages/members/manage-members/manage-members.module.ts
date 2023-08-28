import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageMembersRoutingModule } from './manage-members-routing.module';
import { ManageMembersComponent } from './manage-members.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageMembersComponent
  ],
  imports: [
    CommonModule,
    ManageMembersRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ManageMembersModule { }

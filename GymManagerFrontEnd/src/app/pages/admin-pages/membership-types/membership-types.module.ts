import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipTypesRoutingModule } from './membership-types-routing.module';
import { MembershipTypesComponent } from './membership-types.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MembershipTypesComponent
  ],
  imports: [
    CommonModule,
    MembershipTypesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MembershipTypesModule { }

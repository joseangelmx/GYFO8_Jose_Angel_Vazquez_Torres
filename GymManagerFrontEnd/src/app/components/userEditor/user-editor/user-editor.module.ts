import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditorComponent } from '../user-editor/user-editor.component';
import { LoginFormModule } from '../../login-form/login-form.module';



@NgModule({
  declarations: [
    UserEditorComponent
  ],
  imports: [
    CommonModule,
    LoginFormModule
  ],exports:[
    UserEditorComponent
  ]
})
export class UserEditorModule { }

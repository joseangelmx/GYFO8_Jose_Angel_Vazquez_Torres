import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitLayoutComponent } from './share/init-layout/init-layout.component';
import { AdminLayoutComponent } from './share/admin-layout/admin-layout.component';
import { HasSessionGuard } from './core/guards/has-session.guard';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'',component:InitLayoutComponent,children:[
    { path: 'sign-in', loadChildren: () => import('./pages/login-pages/sign-in/sign-in.module').then(m => m.SignInModule) },
    { path: 'sign-up', loadChildren: () => import('./pages/login-pages/sign-up/sign-up.module').then(m => m.SignUpModule)},
  ]},
  {path:'',component:AdminLayoutComponent,children:[
    { path: 'home', loadChildren: () => import('./pages/admin-pages/home/home.module').then(m => m.HomeModule)},
    { path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule)},
    { path: 'member-in', loadChildren: () => import('./pages/admin-pages/attendance/member-in/member-in.module').then(m => m.MemberInModule) },
    { path: 'member-out', loadChildren: () => import('./pages/admin-pages/attendance/member-out/member-out.module').then(m => m.MemberOutModule) },
    { path: 'attendance-today', loadChildren: () => import('./pages/admin-pages/attendance/attendance-today/attendance-today.module').then(m => m.AttendanceTodayModule) },
    { path: 'attendance-manager', loadChildren: () => import('./pages/admin-pages/attendance/attendance-manager/attendance-manager.module').then(m => m.AttendanceManagerModule) },
    { path: 'new-member', loadChildren: () => import('./pages/admin-pages/members/new-member/new-member.module').then(m => m.NewMemberModule) },
    { path: 'manage-members', loadChildren: () => import('./pages/admin-pages/members/manage-members/manage-members.module').then(m => m.ManageMembersModule) },
    { path: 'membership-types', loadChildren: () => import('./pages/admin-pages//membership-types/membership-types.module').then(m => m.MembershipTypesModule) },
    { path: 'cities', loadChildren: () => import('./pages/admin-pages//cities/cities.module').then(m => m.CitiesModule) },
    { path: 'users', loadChildren: () => import('./pages/admin-pages/users/users.module').then(m => m.UsersModule) },
    { path: 'equipment-types', loadChildren: () => import('./pages/admin-pages/equipment-types/equipment-types.module').then(m => m.EquipmentTypesModule) },
  ],canActivateChild:[HasSessionGuard]},
  {path:'**',redirectTo:'/not-found',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

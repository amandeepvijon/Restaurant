import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminLayout2Component } from './layouts2/admin-layout2/admin-layout2.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes =[
  {
    path: 'dashboard',
   component:DashboardComponent
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }],canActivate:[AuthGuard]
  },
  {
    path: 'inventory',
    component: AdminLayout2Component,
    children: [{
      path: '',
      loadChildren: () => import('./layouts2/admin-layout2/admin-layout2.module').then(m => m.AdminLayout2Module)
    }],canActivate:[AuthGuard]
  },
  {path:'login',component:LoginComponent},
  {path:'reset',component:ResetComponent},
  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

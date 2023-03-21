import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar2Component } from './sidebar2/sidebar2.component';
import { Navbar2Component } from './navbar2/navbar2.component';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    Sidebar2Component,
    Navbar2Component
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule
  ],
  exports: [
    Sidebar2Component,
    Navbar2Component
  ]
})
export class Components2Module { }

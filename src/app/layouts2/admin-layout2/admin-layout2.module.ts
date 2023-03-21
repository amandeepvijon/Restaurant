import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayout2Routes } from './admin-layout2.routing'
import { RouterModule } from '@angular/router';
import { OrderComponent } from '../../order/order.component';

@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayout2Routes),
  ]
})
export class AdminLayout2Module { }

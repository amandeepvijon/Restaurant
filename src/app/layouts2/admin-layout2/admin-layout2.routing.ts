import { Routes } from '@angular/router';
import {OrderComponent} from '../../order/order.component'
export const AdminLayout2Routes: Routes = [
    // {path: 'inventory',
    // redirectTo: 'orders',
    // pathMatch: 'full'},
    {path: 'inventory',component:OrderComponent},
];


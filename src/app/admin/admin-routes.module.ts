import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { MessageComponent } from './message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderDetailsComponent } from './order/details/details.component';

// import { AdminGuard } from './shared/guard/auth.guard';

export const adminRoutes: Routes =  [
  { path: '', component: DashboardComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order/:key', component: OrderDetailsComponent },
  { path: 'message', component: MessageComponent },
  { path: 'user', component: MessageComponent }
];

import { Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { MessageComponent } from './message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderDetailComponent } from './order/detail/detail.component';

// import { AdminGuard } from './shared/guard/auth.guard';

export const adminRoutes: Routes =  [
  { path: '', component: DashboardComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order/:key', component: OrderDetailComponent },
  { path: 'message', component: MessageComponent },
  { path: 'user', component: MessageComponent }
];

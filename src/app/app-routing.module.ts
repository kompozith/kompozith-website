import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { content } from "./shared/routes/routes";

// import { AdminGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    children: content
  },
];

@NgModule({
  imports: [[RouterModule.forRoot(routes)],
],
  exports: [RouterModule]
})
export class AppRoutingModule { }

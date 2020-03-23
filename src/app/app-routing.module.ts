import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteNotFoundComponent } from './modules/shared/components/route-not-found/route-not-found.component';


const routes: Routes = [{
  path: '',
  redirectTo: '/dashboard',
  pathMatch: 'full'
}, {
  path: 'dashboard',
  loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
}, {
  path: '**',
  component: RouteNotFoundComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

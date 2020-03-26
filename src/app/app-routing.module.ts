import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteNotFoundComponent } from './modules/shared/components/route-not-found/route-not-found.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [{
  path: '',
  redirectTo: '/dashboard',
  pathMatch: 'full'
}, {
  path: 'dashboard',
  loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  canActivate: [AuthGuard],
},
{
  path: 'login',
  component: LoginComponent,
},
{
  path: '**',
  component: RouteNotFoundComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

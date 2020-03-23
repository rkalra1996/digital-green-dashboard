import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardCoreComponent } from './components/dashboard-core/dashboard-core.component';


const routes: Routes = [{
  path: '',
  component: DashboardCoreComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

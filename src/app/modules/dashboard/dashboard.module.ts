import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardCoreComponent } from './components/dashboard-core/dashboard-core.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [DashboardCoreComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

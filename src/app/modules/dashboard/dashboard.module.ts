import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardCoreComponent } from './components/dashboard-core/dashboard-core.component';
import { SharedModule } from '../shared/shared.module';
import { FilterToolbarComponent } from './components/filter-toolbar/filter-toolbar.component';
// import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [DashboardCoreComponent, FilterToolbarComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

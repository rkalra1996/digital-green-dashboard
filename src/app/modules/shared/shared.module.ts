import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DashboardToolbarComponent } from './components/dashboard-toolbar/dashboard-toolbar.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule, Router} from '@angular/router';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';



@NgModule({
  declarations: [HeaderComponent, DashboardToolbarComponent, RouteNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
  ],
  exports: [HeaderComponent, DashboardToolbarComponent, RouteNotFoundComponent]
})
export class SharedModule { }

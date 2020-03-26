import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { DashboardToolbarComponent } from './components/dashboard-toolbar/dashboard-toolbar.component';
import {RouterModule, Router} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { RouteNotFoundComponent } from './components/route-not-found/route-not-found.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
// material design imports
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { ConfigService } from './services/config-service/config.service';
import { HttpService } from './services/http-service/http.service';
import { DgTableComponent } from './components/dg-table/dg-table.component';
import { DownloadService } from './services/download-service/download.service';
import { SharedService } from './services/shared-service/shared.service';



@NgModule({
  declarations: [HeaderComponent, DashboardToolbarComponent, RouteNotFoundComponent, DatePickerComponent, DgTableComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,

  ],
  providers: [ConfigService, HttpService, DownloadService, SharedService],
  exports: [HeaderComponent, DashboardToolbarComponent, RouteNotFoundComponent, DatePickerComponent, MatButtonModule, DgTableComponent]
})
export class SharedModule { }

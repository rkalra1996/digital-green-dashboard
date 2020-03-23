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
import { ConfigService } from './services/config-service/config.service';
import { HttpService } from './services/http-service/http.service';



@NgModule({
  declarations: [HeaderComponent, DashboardToolbarComponent, RouteNotFoundComponent, DatePickerComponent],
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
  ],
  providers: [ConfigService, HttpService],
  exports: [HeaderComponent, DashboardToolbarComponent, RouteNotFoundComponent, DatePickerComponent, MatButtonModule]
})
export class SharedModule { }

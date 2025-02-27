import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProAppConfigModule, ProtheusLibCoreModule } from '@totvs/protheus-lib-core';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { MonitorComponent } from './Components/monitor/monitor.component';
import { DashComponent } from './Components/dash/dash.component';


@NgModule({
  declarations: [
    AppComponent,
    MonitorComponent,
    DashComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    ProAppConfigModule,
    ProtheusLibCoreModule,
    PoPageDynamicTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

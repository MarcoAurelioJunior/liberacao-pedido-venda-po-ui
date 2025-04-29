import { importProvidersFrom, NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoHttpRequestModule, PoModule } from '@po-ui/ng-components';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, RouterModule } from '@angular/router';
import { ProAppConfigModule, ProtheusLibCoreModule } from '@totvs/protheus-lib-core';
import { PoPageDynamicTableModule } from '@po-ui/ng-templates';
import { MonitorComponent } from './Components/monitor/monitor.component';
import { FormsModule } from '@angular/forms';
import { PoPageLoginModule } from '@po-ui/ng-templates';
import { ErrorPageComponent } from './Components/error-page/error-page.component';
import { MasterPageComponent } from './Components/master-page/master-page.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { JwtInterceptor } from '../jwtInterceptors';
import { DetalhesComponent } from './Components/detalhes/detalhes.component';



@NgModule({
  declarations: [
    AppComponent,
    MonitorComponent,
    ErrorPageComponent,
    MasterPageComponent,
    DetalhesComponent,
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
    FormsModule,
    PoPageLoginModule
  ],
  providers: [
    provideHttpClient(),
    importProvidersFrom([ProtheusLibCoreModule]),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

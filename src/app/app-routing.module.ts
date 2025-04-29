import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoPageDynamicTableComponent } from '@po-ui/ng-templates';
import { MonitorComponent } from './Components/monitor/monitor.component';
import { ErrorPageComponent } from './Components/error-page/error-page.component';
import { MasterPageComponent } from './Components/master-page/master-page.component';
import { authGuard } from './auth.guard';
import { DetalhesComponent } from './Components/detalhes/detalhes.component';

let rotas: Routes = [];

rotas = 
  [
    { path: '', component: MonitorComponent },
    { path: 'browse', component: MonitorComponent },
    { path: 'detail', component: DetalhesComponent },
  ]

@NgModule({
  imports: [RouterModule.forRoot(rotas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

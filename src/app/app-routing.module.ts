import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoPageDynamicTableComponent } from '@po-ui/ng-templates';
import { MonitorComponent } from './Components/monitor/monitor.component';
import { DashComponent } from './Components/dash/dash.component';

const routes: Routes = [
  {
    path: 'browse',
    component: MonitorComponent
  },
  {
    path: 'dash',
    component: DashComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

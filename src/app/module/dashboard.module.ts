import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from '../component/dashboard/dashboard.component';
import { SidebarModule } from './sidebar.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, FormsModule, SidebarModule],
  exports: [DashboardComponent]
})
export class DashboardModule {}

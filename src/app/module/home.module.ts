import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from '../component/home/home.component';
import { SidebarModule } from './sidebar.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule, SidebarModule],
  exports: [HomeComponent]
})
export class HomeModule {}

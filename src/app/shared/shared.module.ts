import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StopPropagationDirective } from './directives/stop-propagation.directive';

@NgModule({
  declarations: [SidebarComponent, StopPropagationDirective],
  imports: [CommonModule, RouterModule],
  exports: [SidebarComponent, StopPropagationDirective]
})
export class SharedModule {}

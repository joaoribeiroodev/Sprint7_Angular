import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './module/dashboard.module';
import { HomeModule } from './module/home.module';
import { LoginModule } from './module/login.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    DashboardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

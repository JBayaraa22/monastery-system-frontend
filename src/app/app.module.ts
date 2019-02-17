import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RecoverComponent } from './components/recover/recover.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { CashierModule } from './cashier/cashier.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoverComponent,
    
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    ReactiveFormsModule ,
    FormsModule,
    HttpClientModule,
    CashierModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




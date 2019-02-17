import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashierComponent } from './cashier/cashier.component';
import { PrintComponent } from './components/print/print.component';
import { TodayComponent } from './components/today/today.component';
import { CashierRoutingModule } from './cashier-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CashierComponent, 
    PrintComponent, 
    TodayComponent],
  imports: [
    CommonModule,
    CashierRoutingModule,
    FormsModule
  ]
})
export class CashierModule { }

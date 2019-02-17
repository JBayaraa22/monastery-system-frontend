import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashierComponent } from './cashier/cashier.component';
import { TodayComponent } from './components/today/today.component';
import { PrintComponent } from './components/print/print.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path : "cashier",
    component : CashierComponent,
    canActivate : [AuthGuard],
    children : [
    { path : "" , pathMatch : "full" , redirectTo : "today" }, 
      { path: 'today', component: TodayComponent },
      { path: 'print', component: PrintComponent }
     
      
    ]
  }
  
//  { path: 'recover', component: RecoverComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class CashierRoutingModule {}
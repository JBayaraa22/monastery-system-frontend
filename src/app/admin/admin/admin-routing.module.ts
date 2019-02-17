import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AdminComponent } from './admin.component';
import { BooksComponent } from '../components/books/books.component';
import { YearsComponent } from '../components/years/years.component';
import { ReportComponent } from '../components/report/report.component';
import { UserComponent } from '../components/user/user.component';
import {AuthGuard} from '../../guards/auth.guard'
const routes: Routes = [
  {
    path : "admin",
    component : AdminComponent,
    canActivate : [AuthGuard],
    children : [
      { path : "" , pathMatch : "full" , redirectTo : "home" }, 
      { path: 'home', component: HomeComponent },
      { path: 'books', component: BooksComponent },
      { path: 'years', component: YearsComponent },
      { path: 'report', component: ReportComponent },
      { path: 'users', component: UserComponent },
      
    ]
  }
  
//  { path: 'recover', component: RecoverComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {}
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { RecoverComponent } from './components/recover/recover.component';
import { AppComponent } from './app.component';
const routes: Routes = [
  {
    path : '',
    component : AppComponent,
    children : [
      { path: '', pathMatch : 'full' ,redirectTo: 'login' ,  },
      { path: 'login', component: LoginComponent },
      { path: 'recover', component: RecoverComponent }
    ]
  }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
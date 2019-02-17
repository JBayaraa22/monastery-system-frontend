import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../components/home/home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { BooksComponent } from '../components/books/books.component';
import { YearsComponent } from '../components/years/years.component';
import { UserComponent } from '../components/user/user.component';
import { ReportComponent } from '../components/report/report.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    AdminComponent,
    HomeComponent,
    BooksComponent,
    YearsComponent,
    UserComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }

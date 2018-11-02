import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';

@NgModule({
   declarations: [
      AppComponent,
      EmployeesComponent,
      EmployeeComponent,
      EmployeeListComponent,
      LoaderComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      HttpModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
    ],
   providers: [
    LoaderService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

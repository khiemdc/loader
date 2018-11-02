import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { EmployeeService } from '../shared/employee.service'
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  id: number = null;
  data:object = {};
  employees = [];
  constructor(public employeeService: EmployeeService, private http: Http) { }
 
  ngOnInit() {
    this.employeeService.getEmployeeList();
    this.http.get("http://localhost:56111/api/Employees").subscribe(
      (res: Response) => {
        this.employees = res.json();
        this.id = this.employees.length;
        //console.log(this.id);
  });
  }
 
  showForEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);;
  }

  // onDelete(id: number) {
  //   if (confirm('Are you sure to delete this record ?') == true) {
  //     this.employeeService.deleteEmployee(id)
  //     .subscribe(x => {
  //       this.employeeService.getEmployeeList();
  //       this.toastr.warning("Deleted Successfully","Employee Register");
  //     })
  //   }
  // }
}

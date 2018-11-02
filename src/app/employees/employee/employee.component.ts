import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Http, Response, Headers } from '@angular/http';
import { Employee, FunctionalTitle} from '../shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  id: number;
  form: any;
  employees = [];
  employee: Employee[];

  functionalTitles: FunctionalTitle[] = [
    {  functionalTitleId: 1, FunctionalTitle: "Software Developer" },
    {  functionalTitleId: 2, FunctionalTitle: "Tester" },
    {  functionalTitleId: 3, FunctionalTitle: "Business Alytic" }
  ];  

  
  constructor(private employeeService: EmployeeService, private toastrService: ToastrService, private http: Http) { }

  ngOnInit() {
    this.resetForm();
    this.http.get("http://localhost:56111/api/Employees").subscribe(
      (res: Response) => {
        this.employees = res.json();
        this.id = this.employees.length;
        console.log('iD: ' +this.id);
  });
  }

  resetForm(form? : NgForm) {
    if (form != null)
      form.reset();
      this.employeeService.selectedEmployee = {
      EmployeeID: null,
      FirstName: '',
      LastName: '',
      
    }
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.value.EmployeeID == null) {
      this.employeeService.postEmployee(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.employeeService.getEmployeeList();
          this.toastrService.success('New Record Added Succcessfully', 'Employee Register');
        })
    }
    else {
      this.employeeService.putEmployee(form.value.EmployeeID, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.employeeService.getEmployeeList();
        this.toastrService.info('Record Updated Successfully!', 'Employee Register');
      });
    }
  }
}
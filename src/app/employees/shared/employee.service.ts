import { Injectable } from '@angular/core';
import {Employee} from'./employee.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { throwError, pipe} from "rxjs"
import { filter, catchError, mergeMap } from 'rxjs/operators';

import { LoaderService } from '../../loader/loader.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee : Employee;
  //declare variable to display all employees 

  employeeList: Employee[];
  
  constructor(private http: Http, private httpClient: HttpClient, private loaderService: LoaderService) { }
  public apiGlobalURL:string="http://localhost:56111";
  

  postEmployee(emp: Employee) {
  {
    return this.httpClient.post(this.apiGlobalURL + '/api/Employees', emp)
    .pipe(
      map(res => res),
      catchError( this.errorHandler)
      );
  }
}

//getEmployee function to get list of all employees
getEmployeeList() {
  console.log('Beginging Loading employee list....');
  this.showLoader();

  this.http.get(this.apiGlobalURL + '/api/Employees')
  
  
  .pipe(map((data: Response) =>{
    return data.json() as Employee[];
  })).toPromise().then(x => {
    this.employeeList = x;
  });
 
  console.log('eND Loading employee list....');
    this.onEnd();

}

putEmployee(id, emp) {
  var body = JSON.stringify(emp);
  var headerOptions = new Headers({ 'Content-Type': 'application/json' });
  var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
  return this.http.put(this.apiGlobalURL + '/api/Employees/' + id,
    body,
    requestOptions).pipe(map(res => res.json()));
}
  
errorHandler(error: Response) {  
  console.log(error);  
  return throwError(error);  
} 


//getData() is a method to fetch the data from web api or json file

  getData(){
    return this.http.get('assets/titles.json')
    .pipe(map((data: Response) => {
      return data.json();
        
      }))
  
  
    }

    

  private onEnd(): void {
    this.hideLoader();
}

private showLoader(): void {
    this.loaderService.show();
}

private hideLoader(): void {
    this.loaderService.hide();
}

}
